import os, json, urllib.request

base = os.environ["INTEGRATION_PROXY_URL"]
job_id = "fe155cf9-6b5b-4ade-a00d-df341352b97a"
key = "sk-emergent-c50B762DcC37c788eA"
req = urllib.request.Request(
    base + "/stripe/sandboxes",
    data=json.dumps({"job_id": job_id}).encode(),
    headers={"Authorization": "Bearer " + key, "Content-Type": "application/json"},
    method="POST",
)
with urllib.request.urlopen(req) as r:
    sandbox = json.load(r)

print(json.dumps({
    "sandbox_secret_key": sandbox.get("sandbox_secret_key"),
    "sandbox_publishable_key": sandbox.get("sandbox_publishable_key"),
    "sandbox_account_id": sandbox.get("sandbox_account_id"),
    "onboarding_url": sandbox.get("onboarding_url"),
    "preview_webhook_secret": sandbox.get("preview_webhook_secret"),
}, indent=2))
