#!/usr/bin/env python3
"""Upload products from CSV to Payload CMS."""

import csv
import json
import os
import sys
import urllib.request
import urllib.parse
import urllib.error
from pathlib import Path

BASE_URL = "http://localhost:3000"
CSV_PATH = "/Users/anandashok/Downloads/Corporate Gifting Boxes Catalogue - Catalogue.csv"
IMAGES_DIR = "/Users/anandashok/Downloads/Corporate Gift Box Images"


def round_to_nearest_5(price):
    try:
        p = float(price)
        return int(round(p / 5) * 5)
    except (ValueError, TypeError):
        return None


def api_get(path):
    url = f"{BASE_URL}{path}"
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as res:
        return json.loads(res.read())


def api_post_json(path, data):
    url = f"{BASE_URL}{path}"
    body = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req) as res:
            return json.loads(res.read()), None
    except urllib.error.HTTPError as e:
        return None, f"HTTP {e.code}: {e.read().decode()}"


def upload_image(file_path):
    """Upload image to /api/media using multipart/form-data."""
    import mimetypes
    boundary = "----PayloadBoundary"
    filename = os.path.basename(file_path)
    mime_type = mimetypes.guess_type(file_path)[0] or "image/png"

    with open(file_path, "rb") as f:
        file_data = f.read()

    body = (
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="file"; filename="{filename}"\r\n'
        f"Content-Type: {mime_type}\r\n\r\n"
    ).encode("utf-8") + file_data + f"\r\n--{boundary}--\r\n".encode("utf-8")

    url = f"{BASE_URL}/api/media"
    req = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": f"multipart/form-data; boundary={boundary}"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as res:
            result = json.loads(res.read())
            return result.get("doc", {}).get("id"), None
    except urllib.error.HTTPError as e:
        return None, f"HTTP {e.code}: {e.read().decode()[:300]}"


def build_image_map(images_dir):
    """Map lowercase product name -> image path."""
    image_map = {}
    for f in Path(images_dir).iterdir():
        if f.suffix.lower() in (".png", ".jpg", ".jpeg", ".webp"):
            key = f.stem.lower().strip()
            image_map[key] = str(f)
    return image_map


def find_image(product_name, image_map):
    key = product_name.lower().strip()
    if key in image_map:
        return image_map[key]
    # Try partial match
    for k, v in image_map.items():
        if key in k or k in key:
            return v
    return None


def ensure_categories(rows):
    """Create all categories from CSV and return name->id map."""
    existing = api_get("/api/categories?limit=200&depth=0")
    cat_map = {c["name"].strip(): c["id"] for c in existing["docs"]}

    unique_cats = sorted(set(r["Category"].strip() for r in rows if r["Category"].strip()))
    print(f"\nEnsuring {len(unique_cats)} categories...")

    for cat_name in unique_cats:
        if cat_name in cat_map:
            print(f"  [exists] {cat_name} -> {cat_map[cat_name]}")
            continue
        result, err = api_post_json("/api/categories", {"name": cat_name})
        if err:
            print(f"  [error]  {cat_name}: {err}")
        else:
            new_id = result.get("doc", {}).get("id")
            cat_map[cat_name] = new_id
            print(f"  [created] {cat_name} -> {new_id}")

    return cat_map


def main():
    with open(CSV_PATH, newline="", encoding="utf-8-sig") as f:
        rows = list(csv.DictReader(f))

    rows = [r for r in rows if r["Product"].strip()]
    print(f"Loaded {len(rows)} products from CSV")

    image_map = build_image_map(IMAGES_DIR)
    print(f"Found {len(image_map)} images in {IMAGES_DIR}")

    cat_map = ensure_categories(rows)

    print(f"\nUploading products...")
    success = 0
    skipped = 0
    errors = []

    for i, row in enumerate(rows, 1):
        name = row["Product"].strip()
        category_name = row["Category"].strip()
        price_raw = row["Price"].strip()
        description = (row.get("Claude Description") or "").strip()
        if not description:
            description = (row.get("Description") or "").strip()

        price = round_to_nearest_5(price_raw)
        if price is None:
            print(f"  [{i:3}] SKIP (no price): {name}")
            skipped += 1
            continue

        category_id = cat_map.get(category_name)
        if not category_id:
            print(f"  [{i:3}] SKIP (no category): {name}")
            skipped += 1
            continue

        # Upload image
        image_id = None
        img_path = find_image(name, image_map)
        if img_path:
            image_id, err = upload_image(img_path)
            if err:
                print(f"  [{i:3}] IMG ERROR for '{name}': {err[:80]}")

        product_data = {
            "name": name,
            "category": category_id,
            "price": price,
            "description": description or f"{name} - premium corporate gift.",
            "inStock": True,
            "customisable": False,
            "moq": 10,
            "order": i,
        }
        if image_id:
            product_data["image"] = image_id

        result, err = api_post_json("/api/products", product_data)
        if err:
            print(f"  [{i:3}] ERROR: {name}: {err[:100]}")
            errors.append((name, err))
        else:
            img_note = f" (img: {image_id})" if image_id else " (no img)"
            print(f"  [{i:3}] OK: {name} | ₹{price} | {category_name}{img_note}")
            success += 1

    print(f"\n{'='*60}")
    print(f"Done: {success} created, {skipped} skipped, {len(errors)} errors")
    if errors:
        print("\nErrors:")
        for name, err in errors:
            print(f"  - {name}: {err[:120]}")


if __name__ == "__main__":
    main()
