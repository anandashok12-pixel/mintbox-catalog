"""Python twin of scripts/lib/payloadAuth.ts for the urllib-based scripts.

Writes to Products, Categories, Media and the page globals need a logged-in
user. Logs in once (lazily, on the first write) with PAYLOAD_ADMIN_EMAIL /
PAYLOAD_ADMIN_PASSWORD from the environment and returns the JWT header.
"""

import json
import os
import urllib.error
import urllib.request

_tokens = {}


def auth_headers(base_url):
    key = base_url.rstrip("/")
    if key not in _tokens:
        email = (os.environ.get("PAYLOAD_ADMIN_EMAIL") or "").strip()
        password = os.environ.get("PAYLOAD_ADMIN_PASSWORD") or ""
        if not email or not password:
            raise SystemExit(
                "Writing to Payload needs an admin login: set PAYLOAD_ADMIN_EMAIL and PAYLOAD_ADMIN_PASSWORD in the environment."
            )
        req = urllib.request.Request(
            f"{key}/api/users/login",
            data=json.dumps({"email": email, "password": password}).encode("utf-8"),
            headers={"Content-Type": "application/json", "Accept": "application/json"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req) as res:
                token = json.loads(res.read()).get("token")
        except urllib.error.HTTPError as e:
            raise SystemExit(f"Payload login as {email} at {key} failed: HTTP {e.code}")
        if not token:
            raise SystemExit(f"Payload login as {email} at {key} returned no token")
        _tokens[key] = token
    return {"Authorization": f"JWT {_tokens[key]}"}
