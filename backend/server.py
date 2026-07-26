"""Widad International Volunteers (WIV) — Backend API.

Provides:
- Stripe Checkout for donations (dynamic amount, sandbox/claimable) + webhook.
- PayPal Smart Buttons order create/capture (enabled when credentials present).
- Contact form storage + optional Resend email notifications.
- Public config endpoint so the frontend knows which payment methods are live.
"""
import os
import asyncio
import logging
from pathlib import Path
from datetime import datetime, timezone
from typing import Optional, List

import stripe
import requests
import resend
from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY") or "sk_test_emergent"
STRIPE_WEBHOOK_SECRET = os.environ.get("STRIPE_WEBHOOK_SECRET", "")
DONATION_CURRENCY = os.environ.get("DONATION_CURRENCY", "eur").lower()
NGO_EMAIL = os.environ.get("NGO_EMAIL", "widadinternationalvolunteers@gmail.com")

PAYPAL_CLIENT_ID = os.environ.get("PAYPAL_CLIENT_ID", "").strip()
PAYPAL_SECRET = os.environ.get("PAYPAL_SECRET", "").strip()
PAYPAL_MODE = os.environ.get("PAYPAL_MODE", "sandbox").strip()
PAYPAL_BASE = (
    "https://api-m.paypal.com"
    if PAYPAL_MODE == "live"
    else "https://api-m.sandbox.paypal.com"
)
PAYPAL_ENABLED = bool(PAYPAL_CLIENT_ID and PAYPAL_SECRET)

RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "").strip()
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
EMAIL_ENABLED = bool(RESEND_API_KEY)
if EMAIL_ENABLED:
    resend.api_key = RESEND_API_KEY

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("wiv")

app = FastAPI(title="Widad International Volunteers API")
api_router = APIRouter(prefix="/api")


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    subject: str = Field(min_length=1, max_length=200)
    message: str = Field(min_length=1, max_length=5000)


class DonationCheckoutRequest(BaseModel):
    amount: float = Field(gt=0, le=100000)
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    origin_url: str


class PayPalCreateRequest(BaseModel):
    amount: float = Field(gt=0, le=100000)
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr


class PayPalCaptureRequest(BaseModel):
    order_id: str


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
async def send_email(to: List[str], subject: str, html: str) -> Optional[str]:
    if not EMAIL_ENABLED:
        logger.info("Email disabled (no RESEND_API_KEY). Skipping: %s", subject)
        return None
    params = {"from": SENDER_EMAIL, "to": to, "subject": subject, "html": html}
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        return result.get("id") if isinstance(result, dict) else None
    except Exception as e:  # noqa: BLE001
        logger.error("Resend send failed: %s", e)
        return None


def _receipt_html(name: str, amount: float, method: str) -> str:
    return f"""
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#0A0F24">
      <h2 style="color:#0033FF">Merci pour votre don, {name} !</h2>
      <p>Nous confirmons la réception de votre don de
      <strong>{amount:.2f} {DONATION_CURRENCY.upper()}</strong> via {method}.</p>
      <p>Votre soutien permet à Widad International Volunteers de transformer
      l'exil en une force d'innovation durable.</p>
      <p style="color:#64748B;font-size:13px">Ce reçu vaut confirmation.
      Widad International Volunteers — Cameroun.</p>
    </div>
    """


def _paypal_token() -> str:
    resp = requests.post(
        f"{PAYPAL_BASE}/v1/oauth2/token",
        auth=(PAYPAL_CLIENT_ID, PAYPAL_SECRET),
        data={"grant_type": "client_credentials"},
        timeout=20,
    )
    resp.raise_for_status()
    return resp.json()["access_token"]


# ---------------------------------------------------------------------------
# Public config
# ---------------------------------------------------------------------------
@api_router.get("/")
async def root():
    return {"message": "Widad International Volunteers API"}


@api_router.get("/config")
async def get_config():
    return {
        "stripe_enabled": True,
        "paypal_enabled": PAYPAL_ENABLED,
        "paypal_client_id": PAYPAL_CLIENT_ID if PAYPAL_ENABLED else None,
        "paypal_mode": PAYPAL_MODE,
        "email_enabled": EMAIL_ENABLED,
        "currency": DONATION_CURRENCY,
        "ngo_email": NGO_EMAIL,
    }


# ---------------------------------------------------------------------------
# Contact
# ---------------------------------------------------------------------------
@api_router.post("/contact")
async def create_contact(payload: ContactCreate):
    doc = {
        "name": payload.name,
        "email": payload.email,
        "subject": payload.subject,
        "message": payload.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.contact_messages.insert_one(doc)

    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#0A0F24">
      <h2 style="color:#0033FF">Nouveau message de contact — WIV</h2>
      <p><strong>Nom:</strong> {payload.name}</p>
      <p><strong>Email:</strong> {payload.email}</p>
      <p><strong>Sujet:</strong> {payload.subject}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap;background:#F1F5F9;padding:16px;border-radius:8px">{payload.message}</p>
    </div>
    """
    email_id = await send_email([NGO_EMAIL], f"[Contact WIV] {payload.subject}", html)
    return {"status": "received", "email_sent": bool(email_id)}


# ---------------------------------------------------------------------------
# Stripe donations
# ---------------------------------------------------------------------------
@api_router.post("/payments/donate")
async def create_donation_checkout(req: DonationCheckoutRequest):
    amount_cents = int(round(req.amount * 100))
    if amount_cents < 100:
        raise HTTPException(400, "Le montant minimum est de 1.00")
    try:
        session = stripe.checkout.Session.create(
            mode="payment",
            line_items=[
                {
                    "price_data": {
                        "currency": DONATION_CURRENCY,
                        "product_data": {
                            "name": "Don — Widad International Volunteers",
                            "description": "Soutien aux programmes d'innovation durable de WIV",
                        },
                        "unit_amount": amount_cents,
                    },
                    "quantity": 1,
                }
            ],
            customer_email=req.email,
            success_url=f"{req.origin_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{req.origin_url}/payment/cancel",
            metadata={"donor_name": req.name, "donor_email": req.email, "kind": "donation"},
        )
    except stripe.error.StripeError as e:  # noqa: BLE001
        logger.error("Stripe checkout error: %s", e)
        raise HTTPException(500, "Erreur lors de la création du paiement Stripe")

    await db.donations.insert_one(
        {
            "provider": "stripe",
            "session_id": session.id,
            "donor_name": req.name,
            "donor_email": req.email,
            "amount": float(req.amount),
            "currency": DONATION_CURRENCY,
            "status": "initiated",
            "payment_status": "pending",
            "receipt_sent": False,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }
    )
    return {"checkout_url": session.url, "session_id": session.id}


async def _finalize_stripe_donation(record: dict):
    """Mark paid + send receipt once (idempotent on receipt_sent)."""
    if record and not record.get("receipt_sent"):
        await send_email(
            [record["donor_email"]],
            "Reçu de votre don — Widad International Volunteers",
            _receipt_html(record["donor_name"], record["amount"], "Stripe"),
        )
        await db.donations.update_one(
            {"session_id": record["session_id"]}, {"$set": {"receipt_sent": True}}
        )


@api_router.get("/payments/status/{session_id}")
async def get_payment_status(session_id: str):
    record = await db.donations.find_one({"session_id": session_id})
    if not record:
        raise HTTPException(404, "Transaction introuvable")

    if record.get("payment_status") != "paid":
        try:
            s = stripe.checkout.Session.retrieve(session_id)
            if s.payment_status == "paid" or s.status == "complete":
                await db.donations.update_one(
                    {"session_id": session_id, "payment_status": {"$ne": "paid"}},
                    {
                        "$set": {
                            "status": "completed",
                            "payment_status": "paid",
                            "stripe_payment_intent_id": s.payment_intent,
                            "updated_at": datetime.now(timezone.utc).isoformat(),
                        }
                    },
                )
                record = await db.donations.find_one({"session_id": session_id})
                await _finalize_stripe_donation(record)
        except stripe.error.StripeError:
            pass

    return {
        "session_id": record["session_id"],
        "status": record["status"],
        "payment_status": record["payment_status"],
        "amount": record["amount"],
        "currency": record["currency"],
    }


@api_router.post("/stripe/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig = request.headers.get("stripe-signature", "")
    try:
        event = stripe.Webhook.construct_event(payload, sig, STRIPE_WEBHOOK_SECRET)
    except (stripe.error.SignatureVerificationError, ValueError):
        raise HTTPException(400, "Invalid signature")

    obj, t = event["data"]["object"], event["type"]
    if t == "checkout.session.completed":
        await db.donations.update_one(
            {"session_id": obj["id"], "payment_status": {"$ne": "paid"}},
            {
                "$set": {
                    "status": "completed",
                    "payment_status": obj.get("payment_status", "paid"),
                    "stripe_payment_intent_id": obj.get("payment_intent"),
                    "updated_at": datetime.now(timezone.utc).isoformat(),
                }
            },
        )
        record = await db.donations.find_one({"session_id": obj["id"]})
        await _finalize_stripe_donation(record)
    elif t == "checkout.session.expired":
        await db.donations.update_one(
            {"session_id": obj["id"]},
            {"$set": {"status": "expired", "payment_status": "expired"}},
        )
    return {"status": "ok"}


# ---------------------------------------------------------------------------
# PayPal donations
# ---------------------------------------------------------------------------
@api_router.post("/paypal/create-order")
async def paypal_create_order(req: PayPalCreateRequest):
    if not PAYPAL_ENABLED:
        raise HTTPException(503, "PayPal n'est pas configuré")
    try:
        token = await asyncio.to_thread(_paypal_token)
        resp = await asyncio.to_thread(
            lambda: requests.post(
                f"{PAYPAL_BASE}/v2/checkout/orders",
                headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
                json={
                    "intent": "CAPTURE",
                    "purchase_units": [
                        {
                            "amount": {
                                "currency_code": DONATION_CURRENCY.upper(),
                                "value": f"{req.amount:.2f}",
                            },
                            "description": "Don — Widad International Volunteers",
                        }
                    ],
                },
                timeout=20,
            )
        )
        resp.raise_for_status()
        order = resp.json()
    except Exception as e:  # noqa: BLE001
        logger.error("PayPal create order failed: %s", e)
        raise HTTPException(500, "Erreur PayPal lors de la création de la commande")

    await db.donations.insert_one(
        {
            "provider": "paypal",
            "order_id": order["id"],
            "donor_name": req.name,
            "donor_email": req.email,
            "amount": float(req.amount),
            "currency": DONATION_CURRENCY,
            "status": "initiated",
            "payment_status": "pending",
            "receipt_sent": False,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }
    )
    return {"order_id": order["id"]}


@api_router.post("/paypal/capture-order")
async def paypal_capture_order(req: PayPalCaptureRequest):
    if not PAYPAL_ENABLED:
        raise HTTPException(503, "PayPal n'est pas configuré")
    try:
        token = await asyncio.to_thread(_paypal_token)
        resp = await asyncio.to_thread(
            lambda: requests.post(
                f"{PAYPAL_BASE}/v2/checkout/orders/{req.order_id}/capture",
                headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
                timeout=20,
            )
        )
        resp.raise_for_status()
        result = resp.json()
    except Exception as e:  # noqa: BLE001
        logger.error("PayPal capture failed: %s", e)
        raise HTTPException(500, "Erreur PayPal lors de la capture du paiement")

    status = result.get("status")
    record = await db.donations.find_one({"order_id": req.order_id})
    if status == "COMPLETED" and record:
        await db.donations.update_one(
            {"order_id": req.order_id, "payment_status": {"$ne": "paid"}},
            {
                "$set": {
                    "status": "completed",
                    "payment_status": "paid",
                    "updated_at": datetime.now(timezone.utc).isoformat(),
                }
            },
        )
        if not record.get("receipt_sent"):
            await send_email(
                [record["donor_email"]],
                "Reçu de votre don — Widad International Volunteers",
                _receipt_html(record["donor_name"], record["amount"], "PayPal"),
            )
            await db.donations.update_one(
                {"order_id": req.order_id}, {"$set": {"receipt_sent": True}}
            )
    return {"status": status, "order_id": req.order_id}


# ---------------------------------------------------------------------------
# Wire up
# ---------------------------------------------------------------------------
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
