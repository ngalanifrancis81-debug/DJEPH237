"""Widad International Volunteers (WIV) — Backend API.

Volunteering-project + language-course catalogue for 8 African countries,
with registration forms and online payment (Stripe + PayPal) of the
solidarity donation / course fee, plus optional Resend email notifications.
"""
import os
import asyncio
import logging
import uuid
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

from catalog_data import PROJECTS, COURSES, COUNTRIES, CATEGORIES, HERO_IMAGE, COURSES_HERO

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
client = AsyncIOMotorClient(os.environ["MONGO_URL"])
db = client[os.environ["DB_NAME"]]

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY") or "sk_test_emergent"
STRIPE_WEBHOOK_SECRET = os.environ.get("STRIPE_WEBHOOK_SECRET", "")
CURRENCY = os.environ.get("DONATION_CURRENCY", "eur").lower()
NGO_EMAIL = os.environ.get("NGO_EMAIL", "widadinternationalvolunteers@gmail.com")

PAYPAL_CLIENT_ID = os.environ.get("PAYPAL_CLIENT_ID", "").strip()
PAYPAL_SECRET = os.environ.get("PAYPAL_SECRET", "").strip()
PAYPAL_MODE = os.environ.get("PAYPAL_MODE", "sandbox").strip()
PAYPAL_BASE = "https://api-m.paypal.com" if PAYPAL_MODE == "live" else "https://api-m.sandbox.paypal.com"
PAYPAL_ENABLED = bool(PAYPAL_CLIENT_ID and PAYPAL_SECRET)

RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "").strip()
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
EMAIL_ENABLED = bool(RESEND_API_KEY)
if EMAIL_ENABLED:
    resend.api_key = RESEND_API_KEY

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("wiv")

app = FastAPI(title="Widad International Volunteers API")
api_router = APIRouter(prefix="/api")

# ---------------------------------------------------------------------------
# Catalog indexes (static, in-memory)
# ---------------------------------------------------------------------------
PROJECT_BY_SLUG = {p["slug"]: p for p in PROJECTS}
COURSE_BY_SLUG = {c["slug"]: c for c in COURSES}


def get_item(kind: str, slug: str) -> Optional[dict]:
    if kind == "project":
        return PROJECT_BY_SLUG.get(slug)
    if kind == "course":
        return COURSE_BY_SLUG.get(slug)
    return None


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    subject: str = Field(min_length=1, max_length=200)
    message: str = Field(min_length=1, max_length=5000)


class RegistrationCreate(BaseModel):
    kind: str  # project | course
    slug: str
    first_name: str = Field(min_length=1, max_length=80)
    last_name: str = Field(min_length=1, max_length=80)
    email: EmailStr
    phone: str = Field(min_length=3, max_length=40)
    country_residence: str = Field(min_length=1, max_length=80)
    birthdate: str = Field(min_length=4, max_length=20)
    session: str = Field(default="", max_length=120)
    motivation: str = Field(default="", max_length=3000)
    confirm_donation: bool = False


class CheckoutRequest(BaseModel):
    kind: str
    slug: str
    registration_id: Optional[str] = None
    name: str = Field(min_length=1, max_length=160)
    email: EmailStr
    origin_url: str


class PayPalCreateRequest(BaseModel):
    kind: str
    slug: str
    registration_id: Optional[str] = None
    name: str = Field(min_length=1, max_length=160)
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


def _receipt_html(name: str, item_title: str, amount: float, method: str) -> str:
    return f"""
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#0B1F3A">
      <h2 style="color:#C8102E">Merci {name} !</h2>
      <p>Nous confirmons la réception de votre versement de
      <strong>{amount:.0f} {CURRENCY.upper()}</strong> ({method}) pour :</p>
      <p style="background:#F3F4F6;padding:12px 16px;border-radius:8px"><strong>{item_title}</strong></p>
      <p>Notre équipe reviendra vers vous rapidement pour finaliser votre participation.</p>
      <p style="color:#64748B;font-size:13px">Widad International Volunteers — Cameroun.</p>
    </div>
    """


async def _notify_registration(reg: dict, item: dict):
    admin_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#0B1F3A">
      <h2 style="color:#C8102E">Nouvelle candidature — {item['title']}</h2>
      <p><strong>Type:</strong> {reg['kind']} · <strong>Lieu:</strong> {item.get('city','')} ({item['country']})</p>
      <p><strong>Candidat:</strong> {reg['first_name']} {reg['last_name']}</p>
      <p><strong>Email:</strong> {reg['email']} · <strong>Tél:</strong> {reg['phone']}</p>
      <p><strong>Résidence:</strong> {reg['country_residence']} · <strong>Naissance:</strong> {reg['birthdate']}</p>
      <p><strong>Session:</strong> {reg.get('session','')}</p>
      <p><strong>Motivation:</strong></p>
      <p style="white-space:pre-wrap;background:#F3F4F6;padding:12px;border-radius:8px">{reg.get('motivation','')}</p>
    </div>
    """
    await send_email([NGO_EMAIL], f"[Candidature WIV] {item['title']}", admin_html)
    applicant_html = f"""
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#0B1F3A">
      <h2 style="color:#C8102E">Candidature bien reçue, {reg['first_name']} !</h2>
      <p>Merci pour votre intérêt pour <strong>{item['title']}</strong> ({item['country']}).</p>
      <p>Notre équipe étudie votre candidature et vous recontactera très vite. Pour finaliser votre inscription, vous pouvez procéder au versement de solidarité en ligne.</p>
      <p style="color:#64748B;font-size:13px">Widad International Volunteers — Cameroun.</p>
    </div>
    """
    await send_email([reg["email"]], "Votre candidature — Widad International Volunteers", applicant_html)


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
# Public / catalog
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
        "currency": CURRENCY,
        "ngo_email": NGO_EMAIL,
    }


@api_router.get("/countries")
async def list_countries():
    out = []
    for c in COUNTRIES:
        out.append({
            **c,
            "project_count": sum(1 for p in PROJECTS if p["country_slug"] == c["slug"]),
            "course_count": sum(1 for co in COURSES if co["country_slug"] == c["slug"]),
        })
    return {"countries": out, "categories": CATEGORIES, "hero_image": HERO_IMAGE, "courses_hero": COURSES_HERO}


@api_router.get("/projects")
async def list_projects(country: Optional[str] = None):
    items = PROJECTS if not country else [p for p in PROJECTS if p["country_slug"] == country]
    country_obj = next((c for c in COUNTRIES if c["slug"] == country), None)
    return {"projects": items, "country": country_obj}


@api_router.get("/projects/{slug}")
async def project_detail(slug: str):
    p = PROJECT_BY_SLUG.get(slug)
    if not p:
        raise HTTPException(404, "Projet introuvable")
    related = [x for x in PROJECTS if x["country_slug"] == p["country_slug"] and x["slug"] != slug]
    return {"project": p, "related": related}


@api_router.get("/courses")
async def list_courses(country: Optional[str] = None):
    items = COURSES if not country else [c for c in COURSES if c["country_slug"] == country]
    country_obj = next((c for c in COUNTRIES if c["slug"] == country), None)
    return {"courses": items, "country": country_obj}


@api_router.get("/courses/{slug}")
async def course_detail(slug: str):
    c = COURSE_BY_SLUG.get(slug)
    if not c:
        raise HTTPException(404, "Cours introuvable")
    related = [x for x in COURSES if x["country_slug"] == c["country_slug"] and x["slug"] != slug]
    return {"course": c, "related": related}


# ---------------------------------------------------------------------------
# Contact
# ---------------------------------------------------------------------------
@api_router.post("/contact")
async def create_contact(payload: ContactCreate):
    await db.contact_messages.insert_one({**payload.model_dump(), "created_at": datetime.now(timezone.utc).isoformat()})
    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#0B1F3A">
      <h2 style="color:#C8102E">Nouveau message — WIV</h2>
      <p><strong>Nom:</strong> {payload.name}</p>
      <p><strong>Email:</strong> {payload.email}</p>
      <p><strong>Sujet:</strong> {payload.subject}</p>
      <p style="white-space:pre-wrap;background:#F3F4F6;padding:16px;border-radius:8px">{payload.message}</p>
    </div>
    """
    email_id = await send_email([NGO_EMAIL], f"[Contact WIV] {payload.subject}", html)
    return {"status": "received", "email_sent": bool(email_id)}


# ---------------------------------------------------------------------------
# Registrations
# ---------------------------------------------------------------------------
@api_router.post("/registrations")
async def create_registration(payload: RegistrationCreate):
    item = get_item(payload.kind, payload.slug)
    if not item:
        raise HTTPException(404, "Programme introuvable")
    reg_id = str(uuid.uuid4())
    doc = {
        "id": reg_id,
        **payload.model_dump(),
        "item_title": item["title"],
        "amount": item["amount"],
        "currency": CURRENCY,
        "payment_status": "pending",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.registrations.insert_one(doc)
    await _notify_registration(doc, item)
    return {"id": reg_id, "item_title": item["title"], "amount": item["amount"], "currency": CURRENCY}


# ---------------------------------------------------------------------------
# Payments (Stripe)
# ---------------------------------------------------------------------------
@api_router.post("/payments/checkout")
async def create_checkout(req: CheckoutRequest):
    item = get_item(req.kind, req.slug)
    if not item:
        raise HTTPException(404, "Programme introuvable")
    amount_cents = int(round(item["amount"] * 100))
    label = "Don de solidarité" if req.kind == "project" else "Frais de cours"
    try:
        session = stripe.checkout.Session.create(
            mode="payment",
            line_items=[{
                "price_data": {
                    "currency": CURRENCY,
                    "product_data": {"name": f"{label} — {item['title']}", "description": f"{item['country']} · Widad International Volunteers"},
                    "unit_amount": amount_cents,
                },
                "quantity": 1,
            }],
            customer_email=req.email,
            success_url=f"{req.origin_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{req.origin_url}/payment/cancel",
            metadata={"kind": req.kind, "slug": req.slug, "registration_id": req.registration_id or "", "donor_name": req.name},
        )
    except stripe.error.StripeError as e:  # noqa: BLE001
        logger.error("Stripe checkout error: %s", e)
        raise HTTPException(502, "Erreur lors de la création du paiement Stripe")

    await db.payments.insert_one({
        "provider": "stripe",
        "session_id": session.id,
        "kind": req.kind,
        "slug": req.slug,
        "registration_id": req.registration_id,
        "item_title": item["title"],
        "donor_name": req.name,
        "donor_email": req.email,
        "amount": float(item["amount"]),
        "currency": CURRENCY,
        "status": "initiated",
        "payment_status": "pending",
        "receipt_sent": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"checkout_url": session.url, "session_id": session.id}


async def _finalize(record: dict, method: str):
    if not record:
        return
    if record.get("registration_id"):
        await db.registrations.update_one({"id": record["registration_id"]}, {"$set": {"payment_status": "paid"}})
    if not record.get("receipt_sent"):
        await send_email([record["donor_email"]],
                         "Confirmation de paiement — Widad International Volunteers",
                         _receipt_html(record["donor_name"], record["item_title"], record["amount"], method))
        key = "session_id" if record.get("session_id") else "order_id"
        await db.payments.update_one({key: record[key]}, {"$set": {"receipt_sent": True}})


@api_router.get("/payments/status/{session_id}")
async def get_payment_status(session_id: str):
    record = await db.payments.find_one({"session_id": session_id})
    if not record:
        raise HTTPException(404, "Transaction introuvable")
    if record.get("payment_status") != "paid":
        try:
            s = stripe.checkout.Session.retrieve(session_id)
            if s.payment_status == "paid" or s.status == "complete":
                await db.payments.update_one(
                    {"session_id": session_id, "payment_status": {"$ne": "paid"}},
                    {"$set": {"status": "completed", "payment_status": "paid",
                              "stripe_payment_intent_id": s.payment_intent,
                              "updated_at": datetime.now(timezone.utc).isoformat()}})
                record = await db.payments.find_one({"session_id": session_id})
                await _finalize(record, "Stripe")
        except stripe.error.StripeError:
            pass
    return {"session_id": record["session_id"], "status": record["status"],
            "payment_status": record["payment_status"], "amount": record["amount"],
            "currency": record["currency"], "item_title": record.get("item_title", "")}


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
        await db.payments.update_one(
            {"session_id": obj["id"], "payment_status": {"$ne": "paid"}},
            {"$set": {"status": "completed", "payment_status": obj.get("payment_status", "paid"),
                      "stripe_payment_intent_id": obj.get("payment_intent"),
                      "updated_at": datetime.now(timezone.utc).isoformat()}})
        record = await db.payments.find_one({"session_id": obj["id"]})
        await _finalize(record, "Stripe")
    elif t == "checkout.session.expired":
        await db.payments.update_one({"session_id": obj["id"]},
                                     {"$set": {"status": "expired", "payment_status": "expired"}})
    return {"status": "ok"}


# ---------------------------------------------------------------------------
# Payments (PayPal)
# ---------------------------------------------------------------------------
@api_router.post("/paypal/create-order")
async def paypal_create_order(req: PayPalCreateRequest):
    if not PAYPAL_ENABLED:
        raise HTTPException(503, "PayPal n'est pas configuré")
    item = get_item(req.kind, req.slug)
    if not item:
        raise HTTPException(404, "Programme introuvable")
    try:
        token = await asyncio.to_thread(_paypal_token)
        resp = await asyncio.to_thread(lambda: requests.post(
            f"{PAYPAL_BASE}/v2/checkout/orders",
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
            json={"intent": "CAPTURE", "purchase_units": [{
                "amount": {"currency_code": CURRENCY.upper(), "value": f"{item['amount']:.2f}"},
                "description": item["title"][:120]}]},
            timeout=20))
        resp.raise_for_status()
        order = resp.json()
    except Exception as e:  # noqa: BLE001
        logger.error("PayPal create order failed: %s", e)
        raise HTTPException(502, "Erreur PayPal lors de la création de la commande")

    await db.payments.insert_one({
        "provider": "paypal", "order_id": order["id"], "kind": req.kind, "slug": req.slug,
        "registration_id": req.registration_id, "item_title": item["title"],
        "donor_name": req.name, "donor_email": req.email, "amount": float(item["amount"]),
        "currency": CURRENCY, "status": "initiated", "payment_status": "pending",
        "receipt_sent": False, "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()})
    return {"order_id": order["id"]}


@api_router.post("/paypal/capture-order")
async def paypal_capture_order(req: PayPalCaptureRequest):
    if not PAYPAL_ENABLED:
        raise HTTPException(503, "PayPal n'est pas configuré")
    try:
        token = await asyncio.to_thread(_paypal_token)
        resp = await asyncio.to_thread(lambda: requests.post(
            f"{PAYPAL_BASE}/v2/checkout/orders/{req.order_id}/capture",
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}, timeout=20))
        resp.raise_for_status()
        result = resp.json()
    except Exception as e:  # noqa: BLE001
        logger.error("PayPal capture failed: %s", e)
        raise HTTPException(502, "Erreur PayPal lors de la capture du paiement")

    status = result.get("status")
    record = await db.payments.find_one({"order_id": req.order_id})
    if status == "COMPLETED" and record:
        await db.payments.update_one({"order_id": req.order_id, "payment_status": {"$ne": "paid"}},
                                     {"$set": {"status": "completed", "payment_status": "paid",
                                               "updated_at": datetime.now(timezone.utc).isoformat()}})
        record = await db.payments.find_one({"order_id": req.order_id})
        await _finalize(record, "PayPal")
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
