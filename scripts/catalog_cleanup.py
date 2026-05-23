#!/usr/bin/env python3
"""
Mintbox Catalog Cleanup Script
Handles Tasks 1-6: category management, product reassignment, dedup, and rename.
Uses only urllib.request (no external dependencies).
"""

import json
import urllib.request
import urllib.parse
import urllib.error
import sys

BASE_URL = "http://localhost:3000"

# ─── HTTP helpers ────────────────────────────────────────────────────────────

def api_get(path):
    url = BASE_URL + path
    req = urllib.request.Request(url, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())

def api_post(path, data):
    url = BASE_URL + path
    body = json.dumps(data).encode()
    req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())

def api_patch(path, data):
    url = BASE_URL + path
    body = json.dumps(data).encode()
    req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"}, method="PATCH")
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())

def api_delete(path):
    url = BASE_URL + path
    req = urllib.request.Request(url, headers={"Content-Type": "application/json"}, method="DELETE")
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        return {"error": e.code, "msg": e.read().decode()}

def get_all(collection, extra_params=""):
    path = f"/api/{collection}?limit=500&depth=0{extra_params}"
    data = api_get(path)
    docs = data.get("docs", [])
    total = data.get("totalDocs", len(docs))
    # If paginated, fetch more
    page = 1
    while len(docs) < total:
        page += 1
        more = api_get(f"/api/{collection}?limit=500&depth=0&page={page}{extra_params}")
        new_docs = more.get("docs", [])
        if not new_docs:
            break
        docs.extend(new_docs)
    return docs

# ─── Counters ────────────────────────────────────────────────────────────────

stats = {
    "categories_created": 0,
    "categories_updated": 0,
    "categories_deleted": 0,
    "products_reassigned": 0,
    "duplicates_removed": 0,
    "products_renamed": 0,
    "errors": [],
}

def log_error(msg):
    print(f"  ERROR: {msg}")
    stats["errors"].append(msg)

# ─── TASK 1 ──────────────────────────────────────────────────────────────────

CANONICAL_CATEGORIES = [
    (1,  "Electronics"),
    (2,  "Audio"),
    (3,  "Drinkware"),
    (4,  "Diaries & Notebooks"),
    (5,  "Desktop Accessories"),
    (6,  "Pens & Stationery"),
    (7,  "Bags & Backpacks"),
    (8,  "Chocolate & Sweets"),
    (9,  "Apparel"),
    (10, "Snacks & Gourmet Food"),
    (11, "Tea & Coffee"),
    (12, "Home & Living"),
    (13, "Executive Sets"),
    (14, "Gift Hampers"),
    (15, "Baskets & Packaging"),
    (16, "Umbrella"),
    (17, "Fun & Games"),
]

def task1_setup_categories(existing):
    """Create or update canonical categories with order field."""
    print("\n=== TASK 1: Setup canonical categories ===")
    # Build name → category map (case-insensitive lookup)
    by_name = {c["name"].strip().lower(): c for c in existing}
    canonical_ids = {}  # name → id

    for order, name in CANONICAL_CATEGORIES:
        key = name.strip().lower()
        if key in by_name:
            cat = by_name[key]
            try:
                api_patch(f"/api/categories/{cat['id']}", {"order": order})
                print(f"  PATCH  [{order:2d}] {name} (id={cat['id']})")
                stats["categories_updated"] += 1
            except Exception as ex:
                log_error(f"PATCH category '{name}': {ex}")
            canonical_ids[name] = cat["id"]
        else:
            try:
                resp = api_post("/api/categories", {"name": name, "order": order})
                new_id = resp.get("doc", resp).get("id")
                print(f"  POST   [{order:2d}] {name} (id={new_id})")
                stats["categories_created"] += 1
                canonical_ids[name] = new_id
            except Exception as ex:
                log_error(f"POST category '{name}': {ex}")

    return canonical_ids

# ─── TASK 2 & 3 ──────────────────────────────────────────────────────────────

# old name → canonical name  (keep-as-is entries are included for completeness)
OLD_TO_NEW = {
    "Desktop Accesory":       "Desktop Accessories",
    "ValletTray":             "Desktop Accessories",
    "Head Phones":            "Audio",
    "Speaker":                "Audio",
    "Water Bottle":           "Drinkware",
    "Bottle":                 "Drinkware",
    "Mug":                    "Drinkware",
    "Cup":                    "Drinkware",
    "Flask":                  "Drinkware",
    "Diary":                  "Diaries & Notebooks",
    "Coaster":                "Desktop Accessories",
    "Coasters":               "Desktop Accessories",
    "Pen stand":              "Desktop Accessories",
    "Pen Holder":             "Desktop Accessories",
    "Mobile stand":           "Desktop Accessories",
    "Mobile holder":          "Desktop Accessories",
    "Calendar":               "Desktop Accessories",
    "Pen":                    "Pens & Stationery",
    "Pen Gift set":           "Pens & Stationery",
    "Paper Weight":           "Pens & Stationery",
    "Tea Powder":             "Tea & Coffee",
    "Tea":                    "Tea & Coffee",
    "Coffee":                 "Tea & Coffee",
    "Coffee maker":           "Tea & Coffee",
    "Chocolate":              "Chocolate & Sweets",
    "Sweets":                 "Chocolate & Sweets",
    "Snacks":                 "Snacks & Gourmet Food",
    "Chips":                  "Snacks & Gourmet Food",
    "Health Foods":           "Snacks & Gourmet Food",
    "Cookies":                "Snacks & Gourmet Food",
    "Nuts":                   "Snacks & Gourmet Food",
    "Nuts & Dry Fruits":      "Snacks & Gourmet Food",
    "Bag":                    "Bags & Backpacks",
    "Travel Organiser":       "Bags & Backpacks",
    "Shawl gift Box":         "Apparel",
    "Shawl Men":              "Apparel",
    "Shawl Ladies":           "Apparel",
    "Mens waist coat":        "Apparel",
    "Plant":                  "Home & Living",
    "Planter":                "Home & Living",
    "Candle":                 "Home & Living",
    "Humidifier":             "Home & Living",
    "Frame":                  "Home & Living",
    "Chakra Tree":            "Home & Living",
    "Glass Crystal":          "Home & Living",
    "Glass":                  "Home & Living",
    "Executive set":          "Executive Sets",
    "Gift Kit":               "Executive Sets",
    "Basket":                 "Baskets & Packaging",
    "Fun Games":              "Fun & Games",
    "Gold Coin":              "Fun & Games",
    "Tissue Box":             "Fun & Games",
    "Tissue Holder":          "Fun & Games",
    "Spoon":                  "Fun & Games",
    "lamp":                   "Fun & Games",
    "Smart watch":            "Electronics",
    "Smart Tracker":          "Electronics",
    "Power Bank":             "Electronics",
    "Cable":                  "Electronics",
    "Mouse Pad":              "Desktop Accessories",
    "Desk Mat":               "Desktop Accessories",
    "Laptop stand":           "Desktop Accessories",
    "Gift Hampers":           "Gift Hampers",
    "Umbrella":               "Umbrella",
}

# Categories to delete entirely after moving products
CATEGORIES_TO_DELETE = {
    "Test Category",
    "Cool Extras",
    "Packaging",
    "Bags & Backpacks",   # old duplicate — canonical one was already set in task1
    "Bottles",
    "Flasks & Mugs",
    "Diaries & Notebooks",  # old duplicate
    "Tech Items",
    "Apparel",              # old duplicate
    "Home & Living",        # old duplicate
    "Holi Specials",
}

def task2_3_reassign_and_delete(existing_before_task1, canonical_ids):
    """Move products from old categories to canonical ones, then delete old cats."""
    print("\n=== TASK 2 & 3: Reassign products and delete old categories ===")

    # Refresh all categories after task1 created new ones
    all_cats = get_all("categories")
    by_name_ci = {}
    for c in all_cats:
        by_name_ci[c["name"].strip().lower()] = c

    # Helper: resolve a canonical name to its id
    def canon_id(canon_name):
        k = canon_name.strip().lower()
        if k in by_name_ci:
            return by_name_ci[k]["id"]
        # Also check canonical_ids dict
        return canonical_ids.get(canon_name)

    # Process each old→new mapping
    for old_name, new_name in OLD_TO_NEW.items():
        old_key = old_name.strip().lower()
        if old_key not in by_name_ci:
            # Not found — skip silently unless it's expected
            continue
        old_cat = by_name_ci[old_key]
        old_id = old_cat["id"]

        new_id = canon_id(new_name)
        if not new_id:
            log_error(f"Cannot find canonical id for '{new_name}' (mapping from '{old_name}')")
            continue

        # Skip keep-as-is entries where old IS the canonical (same id or same name)
        if old_cat["name"].strip().lower() == new_name.strip().lower():
            # Same category — just ensure order was set in task1, no products to move
            continue

        # Special case: "Head Phones" → rename to "Audio" means it's being merged
        # into the canonical Audio category.  Move products, then delete.

        # Get products in old category
        try:
            prod_data = api_get(f"/api/products?where[category][equals]={old_id}&limit=500&depth=0")
            products = prod_data.get("docs", [])
            total_p = prod_data.get("totalDocs", len(products))
            page = 1
            while len(products) < total_p:
                page += 1
                more = api_get(f"/api/products?where[category][equals]={old_id}&limit=500&depth=0&page={page}")
                nd = more.get("docs", [])
                if not nd:
                    break
                products.extend(nd)
        except Exception as ex:
            log_error(f"GET products for '{old_name}' (id={old_id}): {ex}")
            continue

        print(f"  {old_name} → {new_name}  ({len(products)} products)")

        for prod in products:
            try:
                api_patch(f"/api/products/{prod['id']}", {"category": new_id})
                stats["products_reassigned"] += 1
            except Exception as ex:
                log_error(f"PATCH product {prod['id']} ('{prod.get('name','')}') to cat '{new_name}': {ex}")

        # Delete old category
        try:
            api_delete(f"/api/categories/{old_id}")
            print(f"  DELETE {old_name} (id={old_id})")
            stats["categories_deleted"] += 1
        except Exception as ex:
            log_error(f"DELETE category '{old_name}' (id={old_id}): {ex}")

    # Now delete the "delete entirely" list (test/dupe artefacts)
    # Refresh category list first
    all_cats2 = get_all("categories")
    by_name2 = {c["name"].strip(): c for c in all_cats2}
    # Also build a case-insensitive lookup for fuzzy matches
    by_name2_ci = {c["name"].strip().lower(): c for c in all_cats2}

    # Identify canonical ids to protect them
    protected_ids = set(canonical_ids.values())

    for del_name in CATEGORIES_TO_DELETE:
        key = del_name.strip().lower()
        if key not in by_name2_ci:
            print(f"  (skip delete — not found) {del_name}")
            continue
        cat = by_name2_ci[key]
        if cat["id"] in protected_ids:
            print(f"  (skip delete — is canonical) {del_name} (id={cat['id']})")
            continue

        # Move any remaining products to canonical if applicable
        try:
            prod_data = api_get(f"/api/products?where[category][equals]={cat['id']}&limit=500&depth=0")
            products = prod_data.get("docs", [])
        except Exception as ex:
            log_error(f"GET products for delete-target '{del_name}': {ex}")
            products = []

        if products:
            # Try to find a canonical mapping
            canon_name = OLD_TO_NEW.get(del_name)
            if not canon_name:
                print(f"  WARNING: '{del_name}' has {len(products)} products but no mapping — skipping delete")
                continue
            new_id = canonical_ids.get(canon_name)
            if not new_id:
                print(f"  WARNING: '{del_name}' has {len(products)} products but no canon id for '{canon_name}'")
                continue
            print(f"  Moving {len(products)} orphan products from '{del_name}' → '{canon_name}'")
            for prod in products:
                try:
                    api_patch(f"/api/products/{prod['id']}", {"category": new_id})
                    stats["products_reassigned"] += 1
                except Exception as ex:
                    log_error(f"PATCH product {prod['id']}: {ex}")

        try:
            api_delete(f"/api/categories/{cat['id']}")
            print(f"  DELETE (artefact) {del_name} (id={cat['id']})")
            stats["categories_deleted"] += 1
        except Exception as ex:
            log_error(f"DELETE artefact category '{del_name}': {ex}")


# ─── TASK 4 ──────────────────────────────────────────────────────────────────

def task4_fix_mistagged(canonical_ids):
    """Fix specific mistagged products."""
    print("\n=== TASK 4: Fix mistagged products ===")

    # Refresh all cats
    all_cats = get_all("categories")
    by_name_ci = {c["name"].strip().lower(): c for c in all_cats}

    def cid(name):
        k = name.strip().lower()
        if k in by_name_ci:
            return by_name_ci[k]["id"]
        return canonical_ids.get(name)

    fixes = [
        # (search name pattern or exact, target category)
        ("Plato XB-U88",                              "Audio"),
        ("Taro Mantra 20W",                           "Audio"),
        ("Bella 5W Wireless Bluetooth Speaker",       "Audio"),
        ("Capri 52 Wireless Bluetooth Speaker",       "Audio"),
        ("GEO Inspire 8W",                            "Audio"),
        ("SMALL CALENDER",                            "Desktop Accessories"),
        ("LARGE TABLE CALENDER",                      "Desktop Accessories"),
        ("4 in 1 Gift Pen, mobile stand, key chain & notebook", "Pens & Stationery"),
        ("Farmley Dark Choco Orange Date Bites",      "Chocolate & Sweets"),
        ("Open Secret Chocolate Celebration Gift Box","Snacks & Gourmet Food"),
        ("THE HUDA BAR Granola Bars",                 "Snacks & Gourmet Food"),
        ("EAT Better CO Assorted Laddoo Box",         "Chocolate & Sweets"),
        ("Notepad Journal",                           "Diaries & Notebooks"),
        ("Stainless Steel Wine Tumbler With Lid",     "Drinkware"),
    ]

    for prod_name, target_cat in fixes:
        target_id = cid(target_cat)
        if not target_id:
            log_error(f"Task4: cannot find id for category '{target_cat}'")
            continue

        try:
            encoded = urllib.parse.quote(prod_name)
            data = api_get(f"/api/products?where[name][equals]={encoded}&limit=50&depth=0")
            products = data.get("docs", [])
        except Exception as ex:
            log_error(f"Task4 GET '{prod_name}': {ex}")
            continue

        if not products:
            # Try partial match via contains
            try:
                # Use first 30 chars as a search hint if name is long
                short = prod_name[:40]
                encoded2 = urllib.parse.quote(short)
                data2 = api_get(f"/api/products?where[name][contains]={encoded2}&limit=50&depth=0")
                products = data2.get("docs", [])
            except Exception:
                pass

        if not products:
            print(f"  (not found) {prod_name}")
            continue

        for prod in products:
            try:
                api_patch(f"/api/products/{prod['id']}", {"category": target_id})
                print(f"  PATCH  '{prod['name']}' (id={prod['id']}) → {target_cat}")
                stats["products_reassigned"] += 1
            except Exception as ex:
                log_error(f"Task4 PATCH {prod['id']}: {ex}")


# ─── TASK 5 ──────────────────────────────────────────────────────────────────

DEDUPLICATE_NAMES = [
    "SS Temperature Coffee Travel Mug",
    "Premium Vegan Leather Mouse Pad 2.4mm Tan",
    "Stainless Steel Water Bottle",
    "Aluminum Bottle With Clip",
    "Bamboo Vacuum Insulated Bottle",
    "Stainless Steel Insulation Coffee Cup With Button",
    "Stainless Steel Insulated Coffee Cup",
    "Java Water Bottle",
    "Java XL Water Bottle",
    "Minsk",
    "UX-1531 Vox 5000mAh Magnetic Wireless Power Bank",
    "UX-1524 Rush 10000mAh Wireless Power Bank",
    "His And Her Set Of Jamawar Stole and Shawl",
    "Mens Jamawar Stole, Fine Soft Ethnic Stole Navy Blue",
    "Off Beat Wireless Bluetooth Headphones",
    "Bella 5W Wireless Bluetooth Speaker",
    "Capri 52 Wireless Bluetooth Speaker",
    "GEO Inspire 8W Portable Bluetooth Speaker",
    "Z22 Master Beats TWS Earbuds",
    "Premium Vegan Leather OFFICE / HOME EXECUTIVE SET OF 6",
    "CORK BOTTLE OCEAN-MIST",
    "Wooden Glass Scented Candle",
    "Glass Crystal",
    "Tea spoon",
    "U-SHAPE PLANTER",
    "3 BEAKER PLANTER",
    "CORK DESK ORGANIZER",
    "CORK IPAD DESK ORGANIZER",
    "CORK DESKTOP ORGANIZER TRAY",
    "SMALL CALENDER",
    "ORGANIZER CUM DIARY",
    "sling bag ladies",
    "Brass coffe cup",
]

def task5_dedup(rename_map):
    """Remove duplicate product listings, keeping the one with the lowest ID."""
    print("\n=== TASK 5: Remove duplicate products ===")

    # Build a reverse lookup: after-rename → original name(s)
    # so we can find dupes by the NEW name too
    # For "Brass coffe cup" — note task6 renames it before dedup per instructions
    # We handle this by doing task6 first for "Brass coffe cup" specifically,
    # but since task5 and task6 are sequential in the script, we just search
    # by the name as it currently exists in the DB.

    for name in DEDUPLICATE_NAMES:
        try:
            encoded = urllib.parse.quote(name)
            data = api_get(f"/api/products?where[name][equals]={encoded}&limit=200&depth=0")
            products = data.get("docs", [])
        except Exception as ex:
            log_error(f"Task5 GET '{name}': {ex}")
            continue

        if len(products) <= 1:
            continue  # no duplicates

        # Sort by id ascending (lowest = first created = keep)
        products.sort(key=lambda p: str(p["id"]))
        keep = products[0]
        dupes = products[1:]
        print(f"  '{name}': keep id={keep['id']}, delete {[p['id'] for p in dupes]}")

        for dupe in dupes:
            try:
                api_delete(f"/api/products/{dupe['id']}")
                stats["duplicates_removed"] += 1
            except Exception as ex:
                log_error(f"Task5 DELETE product {dupe['id']} ('{name}'): {ex}")


# ─── TASK 6 ──────────────────────────────────────────────────────────────────

RENAME_MAP = {
    "Sancha Tea Boutique, Happy Breathing Herbal Tea, 25 Pyramid Tea Bags | Ayurvedic Decongestant Blend with Eucalyptus, Bael & Long Pepper | Caffeine-Free Wellness Tea in Double Lid Tin Caddy":
        "Sancha Happy Breathing Herbal Tea – Tin Caddy (25 Bags)",
    "Sancha Tea Boutique, Masala Chai, Original Masala Blend with Ginger, Cardamom & Cinnamon, Premium Assam Tea Blend, 100g Whole Leaves":
        "Sancha Original Masala Chai – 100g",
    "Sancha Japanese Matcha Green Tea Powder | Ceremonial Grade | Imported from Japan | Premium Umami Matcha | 50g":
        "Sancha Ceremonial Grade Matcha – 50g",
    "Sancha Tea Boutique, Brewing Tales Collection, Luxury Gift Box with Ginger Green (50g), Rose Oolong (25g) & Premium Mesh Infuser | Botanical Print Box with Ribbon & Carry Bag":
        "Sancha Brewing Tales Tea Gift Box",
    "Sancha Londoners Earl Grey Tea | 100g Loose Leaf | Premium Darjeeling with Natural Bergamot | British-Style Citrus Blend":
        "Sancha Londoners Earl Grey – 100g",
    "SAN-CHA Tea Boutique | Butterfly Pea Flower Tea | 25 Biodegradable Pyramid Bags | Caffeine-Free Herbal Tisane | Blue & Purple Brew | Since 1981":
        "Sancha Butterfly Pea Flower Tea (25 Bags)",
    "The Cinnamon Kitchen Cacao, Hazelnut & Date Fudge (Pack of 5) | Chocolate Fudge Cubes | Natural & Healthy Snack | Gluten Free | No Refined Sugar | Flour & Dairy Free | 140g":
        "Cinnamon Kitchen Cacao, Hazelnut & Date Fudge – Pack of 5",
    "Loyka Almond Brittle Gold Choco Box - 28 pcs | Premium Chocolate Gift Hamper | Roasted California Almonds (40%), Dark Choco & Salted Caramel | 408g":
        "Loyka Almond Brittle Gold Chocolate Box – 28 pcs",
    "Open Secret Chocolate Brownie Gift Box | 5 Mini Gourmet Brownies | Assorted Chocolate Dessert Hamper | Festive Sweets & Holiday Treats for Gifting | Premium Chocolate Cake Bites":
        "Open Secret Chocolate Brownie Gift Box – 5 pcs",
    "7 BAZAARI™ Healthy Nuts in Dates | Premium Assorted Box with Almond, Pistachio, Apricot & Honey | No Added Sugar, Gluten-Free, Natural Festival Sweets Gift Pack":
        "7 Bazaari Nuts in Dates Assorted Gift Box",
    "Vayu Farms Caramel Makhana 45g Pouch | Roasted Fox Nuts | Sweet & Crunchy Healthy Snacks | Gluten Free | Plant Protein | No Palm Oil | Low Fat Namkeen":
        "Vayu Farms Caramel Makhana – 45g",
    "Natch Thai Sticky Rice Chips, Gluten Free, Vegan, Party Family Pack, All Natural Crunchy Crackers (Wasabi) 100 Gm":
        "Natch Thai Sticky Rice Chips – Wasabi 100g",
    "Awe Foods | Whole Wheat Sourdough Cheese Crackers | Infused with Thyme & Parmesan | Tasty & Healthy Snack | No Preservatives | Perfect with Dips, Spreads or Cheese Platters | 150g":
        "Awe Foods Sourdough Cheese Crackers – 150g",
    "The Whole Truth - Mini Protein Bars - Double Cocoa - Pack of 8 - 8 x 27g - No Added Sugar - All Natural":
        "The Whole Truth Double Cocoa Protein Bars – Pack of 8",
    "EAT Better CO Assorted Laddoo Box - 24 Laddoos in 6 Different Flavors | 95% Dry Fruits | Sugar-Free | 100% Natural | High Protein & Instant Energy - Healthy Snacks, 240g":
        "EAT Better Co. Assorted Laddoo Box – 24 pcs",
    "THIRD WAVE COFFEE Easy Instant Coffee Bags - Arabica, Medium Light Roast, Freshly Ground, Single Origin, Light & Fruity, No Preservatives - Pack of 10":
        "Third Wave Coffee Instant Bags – Arabica Light Roast, Pack of 10",
    "FOO FOODS Kunafa Pistachio Chocolate Bar 50g | Premium Milk Bar with Crunchy Kunafa & Rich Pistachio Filling | Middle Eastern Dessert | Gourmet Fusion Treat":
        "Foo Foods Kunafa Pistachio Chocolate Bar – 50g",
    "THE HUDA BAR Handmade Healthy Gourmet Foods, Breakfast, Snacks Chocolate (Gluten Free) (Pack of 5) Granola Bars 43gms":
        "The Huda Bar Granola Bars – Pack of 5",
    "5:15PM Kunafa Chocolate Bar Dubai Style 120gm | Pistachio Kunafa Dubai Chocolate Dessert | Milk Chocolates, Creamy Pistachios & Crunchy Kunafas Spread":
        "5:15PM Dubai-Style Kunafa Chocolate Bar – 120g",
    "SMOOR Luxe Treat Box of 9 | Premium Assorted Chocolate Gift Box for Celebration, Easter, Birthday, Anniversary, Snacking, Gifting & Special Occasions (9 Pieces)":
        "SMOOR Luxe Assorted Chocolate Box – 9 pcs",
    "Entisi Nutties Chocolates - Hazelnut Chocolate Coated Crunchy Dragees Jar - Gourmet Chocolate Nuts - Gift Jar - Smooth & Crunchy Milk Chocolate Treat - 120g":
        "Entisi Nutties Hazelnut Chocolate Dragees – 120g",
    "Kunafa Chocolate Bar Dubai, Pistachio Kunafa Chocolates, Dubai Chocolate, Rich Pistachio Filling, Crispy Kunafa Milk Chocolate, Middle Eastern Sweets":
        "Dubai-Style Kunafa Pistachio Chocolate Bar",
    "Ferrero Rocher Dark Chocolate Bar 55% Cocoa with Hazelnut 90g | Premium Dark Chocolate | Rich Hazelnut Pieces | Smooth & Intense Taste | Holi Edition (Imported-UK)":
        "Ferrero Rocher Dark Chocolate Bar with Hazelnut – 90g",
    "The Cinnamon Kitchen Berry, Cacao & Oat Cookies (Pack of 5) | As Seen On Shark Tank | 100% Natural & Healthy | Oats | Cranberry | Choco Chip Cookie | PCOS Friendly, 175g | No Dairy":
        "Cinnamon Kitchen Berry, Cacao & Oat Cookies – 175g",
    "The Cinnamon Kitchen Cardamom & Almond Biscotti (125g) | High Protein Snack | 100% Grain-Free & Gluten-Free | Organic Jaggery | No Maida, No Dairy, No Preservatives | Crispy Badam & Elaichi":
        "Cinnamon Kitchen Cardamom & Almond Biscotti – 125g",
    "SMOOR Premium Chocochip Shortbread Cookies | Crunchy & Sweet Gourmet Cookie Biscuits | Loaded with Chocochips | Perfect for Easter, Birthday, Anniversary, Gifting & Snacking | 145gm":
        "SMOOR Chocochip Shortbread Cookies – 145g",
    "The Baker's Dozen Assorted Cookies | Zero Palm Oil | Zero Preservatives | Dark Chocolate | Coconut Oats | Peanut Butter | Chocochip | Handcrafted with Love | 8 Pcs | 83g":
        "The Baker's Dozen Assorted Cookies – 8 pcs",
    "SMOOR Premium Oats & Cranberry Cookies | Savory Gourmet Cookie | Crunchy & Tasty | Perfect for Easter, Birthday, Anniversary, Gifting & Snacking | 200gm":
        "SMOOR Oats & Cranberry Cookies – 200g",
    "SMOOR Toasted Coconut Cookies 150g | Crunchy & Sweet Gourmet Cookie Biscuits | Loaded with Real Coconut | Perfect for Easter, Birthday, Anniversary, Gifting & Snacking | 150g X 3 (Pack of 3)":
        "SMOOR Toasted Coconut Cookies – 150g (Pack of 3)",
    "The Cinnamon Kitchen Cheddar Millet Bites (100 g) | As Seen On Shark Tank | 100% Natural & Healthy | Refined Sugar Free | Plant Based | Gluten Free | Organic | PCOS Friendly | Baked and Not Fried":
        "Cinnamon Kitchen Cheddar Millet Bites – 100g",
    "IRIE Roasted Beetroot Chips Asian Chilly & Masala Ragi Chips – 2×130 g Jar – High-Protein Snack, Gluten-Free, No Preservatives, No Palm Oil":
        "IRIE Beetroot & Ragi Chips Combo – 2×130g",
    "Farmley Dark Choco Orange Date Bites 200g | Dates Barfi Made with Dates, Cocoa Powder, Pista, Cashews, Almonds, Honey, Orange and Pure Ghee | Chocolate Flavoured Healthy Delicious Indian Sweets, No Added Sugar":
        "Farmley Dark Choco Orange Date Bites – 200g",
    "Open Secret Chocolate Celebration Gift Box | 12 Cookies Assortment | Premium Gourmet Cookie Gift Hamper | White Cashew, Choco Almond & Peanut Butter Cookies":
        "Open Secret Gourmet Cookie Gift Box – 12 pcs",
    "UX-1527 10000mAh Power Bank with Inbuilt Cable, Digital Display, and Smart Chip":
        "UX-1527 10000mAh Power Bank – Inbuilt Cable & Display",
    "UX-1525 Pro 30000mAh Power Bank – Slim Design, PD 22.5W Fast Charging & Dual USB Output":
        "UX-1525 Pro 30000mAh Power Bank – PD 22.5W Fast Charge",
    "His And Her Set Of Jamawar Stole and Shawl, Premium Gift Box Packaging, Navy Blue and Pink":
        "His & Her Jamawar Stole & Shawl Gift Set",
    "MENS WOVEN JACQUARD WAISTCOAT, Structured SLIM FIT, Navy Blue":
        "Men's Woven Jacquard Slim Fit Waistcoat – Navy Blue",
    "PREMIUM VEGAN LEATHER VALET TRAY (30X20.5 cm) - TAN":
        "Premium Vegan Leather Valet Tray – Tan",
    "Premium Vegan Leather OFFICE / HOME EXECUTIVE SET OF 6":
        "Premium Vegan Leather Executive Desk Set of 6",
    "Flyberry Gourmet Spiced Taro Chips, 150g (Pack of 3x50g)":
        "Flyberry Spiced Taro Chips – 150g (Pack of 3)",
    "Ferrero Rocher Premium Chocolates 24 Pieces, 300 g":
        "Ferrero Rocher Chocolate Box – 24 pcs",
    "Coffe mug":
        "Coffee Mug",
    "Coffe Mug for Travel":
        "Coffee Mug for Travel",
    "Brass coffe cup":
        "Brass Coffee Cup",
    "POPULAR GOURMET Macadamia Nuts, 200 gm":
        "POPULAR GOURMET Macadamia Nuts – 200g",
    "POPULAR GOURMET Pecan Nuts, 200 gm":
        "POPULAR GOURMET Pecan Nuts – 200g",
    "USW-2 Hydra Bluetooth Calling Smartwatch":
        "USW-2 Hydra Bluetooth Smartwatch",
    "4700BC Gourmet Popcorn: Tiramisu Chocolate Tin, 135g":
        "4700BC Tiramisu Chocolate Popcorn Tin – 135g",
    "Dukes Cookie Empire Gourmet Assorted Cookies (400g)":
        "Dukes Cookie Empire Assorted Cookies – 400g",
}

def task6_rename_products():
    """Rename products per the rename map. Renames ALL matching products (for dedup safety)."""
    print("\n=== TASK 6: Rename products ===")

    for old_name, new_name in RENAME_MAP.items():
        try:
            encoded = urllib.parse.quote(old_name)
            data = api_get(f"/api/products?where[name][equals]={encoded}&limit=200&depth=0")
            products = data.get("docs", [])
        except Exception as ex:
            log_error(f"Task6 GET '{old_name[:60]}...': {ex}")
            continue

        if not products:
            print(f"  (not found) {old_name[:70]}")
            continue

        for prod in products:
            try:
                api_patch(f"/api/products/{prod['id']}", {"name": new_name})
                print(f"  RENAME id={prod['id']}  →  '{new_name}'")
                stats["products_renamed"] += 1
            except Exception as ex:
                log_error(f"Task6 PATCH {prod['id']} name: {ex}")


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    print("Fetching all current categories...")
    existing = get_all("categories")
    print(f"Found {len(existing)} categories.")

    # Task 1
    canonical_ids = task1_setup_categories(existing)

    # Tasks 2 & 3
    task2_3_reassign_and_delete(existing, canonical_ids)

    # Task 4
    task4_fix_mistagged(canonical_ids)

    # Task 6 — rename BEFORE dedup so dedup finds the right names
    # (Especially "Brass coffe cup" → "Brass Coffee Cup" must happen before dedup)
    task6_rename_products()

    # Task 5 — dedup after renames
    task5_dedup(RENAME_MAP)

    # Summary
    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    print(f"  Categories created:   {stats['categories_created']}")
    print(f"  Categories updated:   {stats['categories_updated']}")
    print(f"  Categories deleted:   {stats['categories_deleted']}")
    print(f"  Products reassigned:  {stats['products_reassigned']}")
    print(f"  Products renamed:     {stats['products_renamed']}")
    print(f"  Duplicates removed:   {stats['duplicates_removed']}")
    print(f"  Errors:               {len(stats['errors'])}")
    if stats["errors"]:
        print("\nErrors:")
        for e in stats["errors"]:
            print(f"  - {e}")

if __name__ == "__main__":
    main()
