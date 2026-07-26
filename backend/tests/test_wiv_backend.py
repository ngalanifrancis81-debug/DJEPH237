"""Backend tests for WIV (Widad International Volunteers) — pivot to volunteer catalogue."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
API = f"{BASE_URL}/api"

PROJECT_SLUG = "rehabilitation-centre-enfants-bafoussam"
PROJECT_AMOUNT = 320
COURSE_SLUG = "mali-bambara-bamako"
COURSE_AMOUNT = 210

COUNTRY_SLUGS = {"cameroun", "mali", "nigeria", "senegal", "maroc", "benin", "burkina-faso", "niger"}


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
        d = r.json()
        assert d["stripe_enabled"] is True
        assert d["paypal_enabled"] is False
        assert d["email_enabled"] is False
        assert d["currency"] == "eur"
        assert "widadinternationalvolunteers" in d.get("ngo_email", "")


# ---------------- Countries ----------------
class TestCountries:
    def test_countries(self, s):
        r = s.get(f"{API}/countries", timeout=30)
        assert r.status_code == 200
        d = r.json()
        assert "hero_image" in d and d["hero_image"]
        countries = d["countries"]
        assert len(countries) == 8
        slugs = {c["slug"] for c in countries}
        assert slugs == COUNTRY_SLUGS or COUNTRY_SLUGS.issubset(slugs)
        for c in countries:
            assert c["project_count"] == 3, f"{c['slug']} project_count={c['project_count']}"
            assert c["course_count"] == 3, f"{c['slug']} course_count={c['course_count']}"


# ---------------- Projects ----------------
class TestProjects:
    def test_projects_by_country(self, s):
        r = s.get(f"{API}/projects", params={"country": "cameroun"}, timeout=30)
        assert r.status_code == 200
        d = r.json()
        assert len(d["projects"]) == 3
        assert d["country"] is not None
        assert d["country"]["slug"] == "cameroun"

    def test_project_detail(self, s):
        r = s.get(f"{API}/projects/{PROJECT_SLUG}", timeout=30)
        assert r.status_code == 200
        d = r.json()
        p = d["project"]
        assert p["slug"] == PROJECT_SLUG
        assert p["amount"] == PROJECT_AMOUNT
        assert p["city"] == "Bafoussam"
        assert isinstance(p.get("categories"), list) and len(p["categories"]) >= 1
        assert p.get("description")
        assert isinstance(d["related"], list)

    def test_project_unknown_404(self, s):
        r = s.get(f"{API}/projects/does-not-exist-slug", timeout=30)
        assert r.status_code == 404


# ---------------- Courses ----------------
class TestCourses:
    def test_courses_by_country(self, s):
        r = s.get(f"{API}/courses", params={"country": "mali"}, timeout=30)
        assert r.status_code == 200
        d = r.json()
        assert len(d["courses"]) == 3
        assert d["country"]["slug"] == "mali"

    def test_course_detail(self, s):
        r = s.get(f"{API}/courses/{COURSE_SLUG}", timeout=30)
        assert r.status_code == 200
        d = r.json()
        c = d["course"]
        assert c["slug"] == COURSE_SLUG
        assert c["amount"] == COURSE_AMOUNT
        assert isinstance(c.get("schedule"), list) and len(c["schedule"]) > 0
        assert isinstance(d["related"], list)

    def test_course_unknown_404(self, s):
        r = s.get(f"{API}/courses/nope-slug", timeout=30)
        assert r.status_code == 404


# ---------------- Registrations ----------------
class TestRegistrations:
    reg_project_id = None
    reg_course_id = None

    def _payload(self, kind, slug):
        return {
            "kind": kind,
            "slug": slug,
            "first_name": "TEST",
            "last_name": "Applicant",
            "email": "test_applicant@example.com",
            "phone": "+237600000000",
            "country_residence": "France",
            "birthdate": "1995-05-05",
            "session": "Été 2026",
            "motivation": "Motivation TEST",
            "confirm_donation": True,
        }

    def test_registration_project(self, s):
        r = s.post(f"{API}/registrations", json=self._payload("project", PROJECT_SLUG), timeout=30)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["amount"] == PROJECT_AMOUNT
        assert d["currency"] == "eur"
        assert d.get("id")
        assert d.get("item_title")
        TestRegistrations.reg_project_id = d["id"]

    def test_registration_course(self, s):
        r = s.post(f"{API}/registrations", json=self._payload("course", COURSE_SLUG), timeout=30)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["amount"] == COURSE_AMOUNT
        TestRegistrations.reg_course_id = d["id"]

    def test_registration_unknown_slug_404(self, s):
        p = self._payload("project", "unknown-slug-xyz")
        r = s.post(f"{API}/registrations", json=p, timeout=30)
        assert r.status_code == 404


# ---------------- Stripe checkout ----------------
class TestCheckout:
    session_id = None

    def test_checkout_project(self, s):
        payload = {
            "kind": "project",
            "slug": PROJECT_SLUG,
            "registration_id": TestRegistrations.reg_project_id,
            "name": "TEST Donor",
            "email": "test_donor@example.com",
            "origin_url": "https://example.com",
        }
        r = s.post(f"{API}/payments/checkout", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        d = r.json()
        assert "checkout.stripe.com" in d["checkout_url"]
        assert d["session_id"].startswith("cs_")
        TestCheckout.session_id = d["session_id"]

    def test_status_pending(self, s):
        assert TestCheckout.session_id
        r = s.get(f"{API}/payments/status/{TestCheckout.session_id}", timeout=30)
        assert r.status_code == 200
        d = r.json()
        assert d["amount"] == PROJECT_AMOUNT
        assert d["currency"] == "eur"
        assert d["payment_status"] in ("pending", "unpaid")

    def test_status_unknown_404(self, s):
        r = s.get(f"{API}/payments/status/cs_test_unknown_xyz", timeout=30)
        assert r.status_code == 404

    def test_checkout_unknown_slug_404(self, s):
        payload = {
            "kind": "project", "slug": "unknown-xyz",
            "name": "x", "email": "x@example.com", "origin_url": "https://x.com",
        }
        r = s.post(f"{API}/payments/checkout", json=payload, timeout=30)
        assert r.status_code == 404


# ---------------- PayPal (disabled) ----------------
class TestPayPal:
    def test_paypal_503(self, s):
        r = s.post(f"{API}/paypal/create-order",
                   json={"kind": "project", "slug": PROJECT_SLUG,
                         "name": "TEST", "email": "t@e.com"},
                   timeout=30)
        assert r.status_code == 503
