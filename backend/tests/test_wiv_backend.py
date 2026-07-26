"""Backend tests for WIV (Widad International Volunteers) API."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # fallback to frontend .env
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip().rstrip("/")

API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


# ---------------- Config ----------------
class TestConfig:
    def test_config_flags(self, s):
        r = s.get(f"{API}/config", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert data["stripe_enabled"] is True
        assert data["paypal_enabled"] is False
        assert data["email_enabled"] is False
        assert data["currency"] == "eur"
        assert "widadinternationalvolunteers" in data.get("ngo_email", "")


# ---------------- Donations ----------------
class TestDonations:
    session_id = None

    def test_donate_valid_creates_checkout(self, s):
        payload = {
            "amount": 25,
            "name": "TEST_Donor",
            "email": "test_donor@example.com",
            "origin_url": "https://example.com",
        }
        r = s.post(f"{API}/payments/donate", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "checkout_url" in data
        assert "checkout.stripe.com" in data["checkout_url"]
        assert data["session_id"].startswith("cs_")
        TestDonations.session_id = data["session_id"]

    def test_status_pending_for_new_session(self, s):
        assert TestDonations.session_id
        r = s.get(f"{API}/payments/status/{TestDonations.session_id}", timeout=30)
        assert r.status_code == 200
        d = r.json()
        assert d["session_id"] == TestDonations.session_id
        assert d["payment_status"] in ("pending", "unpaid")
        assert d["amount"] == 25
        assert d["currency"] == "eur"

    def test_status_unknown_session_404(self, s):
        r = s.get(f"{API}/payments/status/cs_test_unknown_xyz", timeout=30)
        assert r.status_code == 404

    def test_donate_below_min_returns_400(self, s):
        payload = {
            "amount": 0.5,
            "name": "TEST_Donor",
            "email": "test_donor@example.com",
            "origin_url": "https://example.com",
        }
        r = s.post(f"{API}/payments/donate", json=payload, timeout=30)
        # 0.5 -> 50 cents < 100 -> 400
        assert r.status_code == 400, r.text

    def test_donate_invalid_email_422(self, s):
        r = s.post(
            f"{API}/payments/donate",
            json={"amount": 10, "name": "x", "email": "notanemail", "origin_url": "https://x.com"},
            timeout=30,
        )
        assert r.status_code == 422


# ---------------- Contact ----------------
class TestContact:
    def test_contact_valid(self, s):
        payload = {
            "name": "TEST_User",
            "email": "test_user@example.com",
            "subject": "TEST subject",
            "message": "TEST message body",
        }
        r = s.post(f"{API}/contact", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["status"] == "received"
        assert d["email_sent"] is False

    def test_contact_invalid_email(self, s):
        payload = {
            "name": "TEST_User",
            "email": "notemail",
            "subject": "s",
            "message": "m",
        }
        r = s.post(f"{API}/contact", json=payload, timeout=30)
        assert r.status_code == 422


# ---------------- PayPal (disabled) ----------------
class TestPayPal:
    def test_paypal_create_503(self, s):
        r = s.post(
            f"{API}/paypal/create-order",
            json={"amount": 10, "name": "TEST_U", "email": "t@e.com"},
            timeout=30,
        )
        assert r.status_code == 503
