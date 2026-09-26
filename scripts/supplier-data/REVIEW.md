# Diwali 2026 / Corporate Gifting Catalog — Local Review

Branch: `feature/diwali-2026-catalog` (in a separate git worktree at `/Users/anandashok/mintbox-catalog-diwali`, based off `main`, isolated from the in-progress `feat/crm-whatsapp-mirror` work).

**Local preview URL:** http://localhost:3010/dev-preview/diwali-2026-catalog
(run `npm run dev -- -p 3010` from `/Users/anandashok/mintbox-catalog-diwali`, or use the `diwali-2026-preview` entry added to `.claude/launch.json`)

Nothing here has been deployed, pushed, or written to any database. All 50 products live only in `src/data/diwali2026Products.ts`, a local file the preview page reads directly — the real catalog (Payload CMS + Vercel Postgres/Blob) has not been touched.

## Why this is a local file, not a CMS write

The MintBox catalog actually lives in Payload CMS on Vercel Postgres, not in local JSON — discovered before any writes happened. No `.env.local` exists in this checkout, so there's no way to tell from the repo alone whether local dev points at a separate database or production. Per the "never write to a production database" rule, this phase stays entirely local: a TS data file, a preview-only route gated on `NODE_ENV`, and a not-yet-run import script (`scripts/import-diwali-2026-catalog.ts`) for when you're ready to push these into Payload yourself.

## ⚠️ Most important open item: product photos show supplier branding

Several supplier photos have the supplier's own product label visibly printed on the physical packaging in the shot (for example, product #21's photo shows a yellow label reading the supplier's brand name and "White Jasmine" directly on the box). This is separate from the text-based safeguards below (names, descriptions, filenames, alt text — all clean) — it's the literal photograph. Every image in `public/catalog/diwali-2026/` is a supplier reference photo (`imageStatus: "supplier-reference"`) and **none of these should go live** until either:
- the supplier confirms image usage rights and you're comfortable with their branding being visible in a small number of shots, or
- MintBox reshoots or crops/retouches the affected photos.

I did not crop or retouch any images — that's a judgment call for you, not something to do silently.

## What was verified

- **Supplier name never appears anywhere in text**: checked with `scripts/supplier-data/check-no-supplier-leak.ts` (also normalizes Unicode, since one product's reference text had the supplier's name in stylized bold Unicode characters that a plain-ASCII regex would miss — the copywriting pass excluded it, and the checker now catches that trick too). Zero hits across the dataset, the preview page/component, and every image filename.
- `npm run lint` — clean.
- `npm run build` (production) — compiles and type-checks cleanly. The `/dev-preview/diwali-2026-catalog` route resolves to a static **not-found** page in a production build (verified in the build output), so it will not be reachable if this branch is ever deployed as-is.
- Local dev server: all 50 products render, all 187 processed images return 200 (no broken images), category filter chips and tier filter both work, product detail modal opens with full description/features/price/MOQ, no console errors. Checked at both desktop and mobile (375px) widths.
- No supplier image URLs (`auradecor.co.in`, `cdn.shopify.com`, etc.) are referenced anywhere under `src/` or `public/` — all 187 images were downloaded, converted to WebP (max 1600px, quality 80) and re-served from `public/catalog/diwali-2026/<slug>/`.

## All 50 products

| # | Name | Category | Tier | Price (MRP) | Display Mode | Local URL |
|---|---|---|---|---|---|---|
| 1 | Maharaja Royal Votive Candle Set | Candles | premium | ₹2,649 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-001) |
| 2 | Wooden Whisper Candle & Diffuser Duo | Aroma Gift Sets | premium | ₹3,099 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-002) |
| 3 | Grandeur Wooden Urli Candle | Urli & Floating Décor | premium | ₹2,549 | starting-from | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-003) |
| 4 | Luxe Noir Reed Diffuser, 500ml | Reed Diffusers | premium | ₹3,499 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-004) |
| 5 | Candle Warmer Lamp with Aroma Candle | Décor & Figurines | premium | ₹3,299 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-005) |
| 6 | Electric Candle Warmer with Aroma Candle | Décor & Figurines | premium | ₹3,499 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-006) |
| 7 | Smart Plug-In Aroma Diffuser | Aroma Gift Sets | premium | ₹7,699 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-007) |
| 8 | Lotus Urli Trio, Oudh | Urli & Floating Décor | premium | ₹2,199 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-008) |
| 9 | Fragrance Urli Candle Pair, Gift Pack | Urli & Floating Décor | premium | ₹2,199 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-009) |
| 10 | Sanskrit Serenity Candle Set | Candles | premium | ₹1,999 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-010) |
| 11 | Golfer Figurine, Black & Gold | Décor & Figurines | premium | ₹2,199 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-011) |
| 12 | Saxophone Player Figurine, Black & Gold | Décor & Figurines | premium | ₹2,199 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-012) |
| 13 | Aromatherapy Flame Humidifier | Aroma Gift Sets | premium | ₹2,199 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-013) |
| 14 | Black & Gold Dust Pillar Candle Set | Candles | premium | ₹1,649 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-014) |
| 15 | Aromatherapy Combo Gift Pack | Aroma Gift Sets | premium | ₹1,649 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-015) |
| 16 | Blue Horizon Reed Diffuser Set | Reed Diffusers | premium | ₹1,649 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-016) |
| 17 | Amber Jar Candle Set of 4 | Candles | mid | ₹1,549 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-017) |
| 18 | Phool Serenity Diwali Gift Set | Festive Gift Sets | mid | ₹1,449 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-018) |
| 19 | Urli Gift Set with Floating Candles | Urli & Floating Décor | mid | ₹1,299 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-019) |
| 20 | Moroccan Tin Candle Set of 4 | Candles | mid | ₹1,299 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-020) |
| 21 | Aromatherapy Gift Set, Diffuser & Potpourri | Aroma Gift Sets | mid | ₹1,299 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-021) |
| 22 | Hammered Golden Urli Bowl, 12 Inch | Urli & Floating Décor | mid | ₹1,299 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-022) |
| 23 | Gold Pillar Candle Set of 3 | Candles | mid | ₹1,199 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-023) |
| 24 | Elegante Reed Diffuser, 100ml | Reed Diffusers | mid | ₹1,199 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-024) |
| 25 | Luxury Pillar Candle Set of 3 | Candles | mid | ₹1,099 | starting-from | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-025) |
| 26 | Single Lotus Urli Candle | Urli & Floating Décor | mid | ₹1,099 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-026) |
| 27 | Amber Gold Candle Gift Set | Candles | mid | ₹1,099 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-027) |
| 28 | Velvet Addiction Candle, Single Malt | Candles | mid | ₹1,099 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-028) |
| 29 | Embrace Soy Candle, Oudh & Honey | Candles | mid | ₹1,099 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-029) |
| 30 | Frosted Fragrance Glass Candle Set of 4 | Candles | mid | ₹1,099 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-030) |
| 31 | Reed Diffuser Gift Set with Potpourri | Reed Diffusers | mid | ₹1,099 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-031) |
| 32 | Lavender Aroma Diffuser Gift Set | Aroma Gift Sets | mid | ₹1,099 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-032) |
| 33 | Fragrance Votive Glass Candle Set of 12 | Candles | mid | ₹999 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-033) |
| 34 | Elysian Reed Diffuser, Lavender & Oudh | Reed Diffusers | mid | ₹999 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-034) |
| 35 | Fragrance Urli Candle, Oudh | Urli & Floating Décor | mid | ₹899 | starting-from | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-035) |
| 36 | Diwali Elegance Gift Set | Festive Gift Sets | mid | ₹899 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-036) |
| 37 | Royal Flush Playing Card Candle Set | Candles | budget | ₹899 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-037) |
| 38 | Floral Bloom Scented Candle | Candles | budget | ₹899 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-038) |
| 39 | Aromatherapy Gift Set, Mercury & Tealight | Aroma Gift Sets | budget | ₹799 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-039) |
| 40 | Camphor Reed Diffuser, 100ml | Reed Diffusers | budget | ₹749 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-040) |
| 41 | Scented Tomb-Lid Jar Candle | Candles | budget | ₹749 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-041) |
| 42 | Divine Pooja Diwali Gift Box | Festive Gift Sets | budget | ₹649 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-042) |
| 43 | Black Lid Jar Candle | Candles | budget | ₹649 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-043) |
| 44 | Playing Deck Pillar Candle Set | Candles | budget | ₹649 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-044) |
| 45 | Jharokha Wall Décor with LED Candles | Décor & Figurines | budget | ₹549 | starting-from | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-045) |
| 46 | Shubh Labh Scented Candle Set | Festive Gift Sets | budget | ₹449 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-046) |
| 47 | Golden Mercury Votive Candle Set | Candles | budget | ₹399 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-047) |
| 48 | Floating Flower Candle Duo | Candles | budget | ₹399 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-048) |
| 49 | Festive Ladoo Candle Set of 4 | Festive Gift Sets | budget | ₹349 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-049) |
| 50 | Festive Sutli Pataka Candle | Festive Gift Sets | budget | ₹349 | fixed | [link](http://localhost:3010/dev-preview/diwali-2026-catalog#product-mb-diwali-050) |

*(All 50 anchors point at the same preview page — use the category chips at the top to narrow down, or the browser's find-in-page on the product name. There are no separate per-product URLs, matching how the rest of the site works today: products only exist as cards + a detail modal, never a dedicated page.)*

## Fetch status

All 50 handles fetched successfully on the first attempt (`scripts/supplier-data/fetch-supplier-data.ts`), plus all 5 bulk-pack reference handles. Nothing fell back to placeholder content. Raw responses are saved (gitignored) in `scripts/supplier-data/raw/`.

Data quality notes the copywriters flagged while drafting (all resolved conservatively — no invented facts):
- **#25** (Luxury Pillar Candle Set of 3): source burn-time figures were inconsistent across the reference text (55/75/90 hours in one place, 55/70/90 in another); the more consistent set was used and phrased as "up to" to avoid overclaiming.
- **#26** (Single Lotus Urli Candle): the reference text actually describes a set of three lotus-shaped candles despite the product's singular name. Since renaming wasn't in scope, the name stayed as given and the copy accurately describes the set-of-three contents.
- **#31** (Reed Diffuser Gift Set with Potpourri): source potpourri weight conflicted (60g vs 100g in different places); the number was omitted rather than guessed.

## Pricing

Multiplier logic lives in one place: [`src/config/pricing.ts`](../../src/config/pricing.ts) — currently a **placeholder 2.2x** on supplier cost, rounded to a `...49`/`...99` ending. **You need to set the real multiplier before anything goes live.**

Full margin breakdown: [`scripts/supplier-data/pricing-review.csv`](pricing-review.csv) (id, name, tier, supplierCost, multiplier, mrp, displayMode, bulkNote — open in a spreadsheet).

Two products use variant price ranges and are marked `displayMode: "starting-from"` (using the lowest variant price for `mrp`): #3 Grandeur Wooden Urli Candle, #35 Fragrance Urli Candle, Oudh, plus #25 and #45. Note the existing site (and this preview) always renders a single flat price per unit — there's no "starting from ₹X" UI treatment anywhere in the codebase today, so these currently just show their lowest-variant price like everything else. Building that UI treatment is a separate piece of work if you want it.

One outlier worth a manual look: **#7 Smart Plug-In Aroma Diffuser comes out to ₹7,699**, well above the rest of the catalog (supplier cost ₹3,500 × 2.2). Worth deciding whether this product belongs in a corporate-gifting price band at all, or needs a different multiplier.

Bulk-pack reference data (for `bulkNote` / internal margin planning only, never rendered): 4 of the 5 supplier bulk packs matched to a specific product number (#49, #48, #45, #21); the "Electric Burner Gift Set, 24 pcs" bulk pack didn't correspond to any of the 50 products in this list, so it's recorded but unused.

## Open TODOs before anything goes live

1. **Image rights** — see the flagged item above. Highest priority; some photos show visible supplier branding.
2. **Final pricing** — replace the 2.2x placeholder in `src/config/pricing.ts` and re-run `npx tsx scripts/supplier-data/build-copy-input-and-pricing.ts && npx tsx scripts/supplier-data/assemble-local-dataset.ts` to regenerate everything downstream.
3. **MOQ and lead times** — currently defaulted to MOQ 10 / 7 days for everything except the two electronic items (#7 smart diffuser, #13 flame humidifier) which got MOQ 10 / 10 days as a guess given they're likely lower-volume, imported items. Worth double-checking with the supplier.
4. **Copy approval** — read through `src/data/diwali2026Products.ts` (or just the live preview). All copy is original, but it's AI-drafted and you should read it before it represents MintBox publicly.
5. **Category and hub placement** — these 50 are in six new categories (candles, urli, reed-diffusers, aroma-gift-sets, decor, festive-sets), separate from the existing `diwali-gift-boxes` category (the 55 DK boxes already on `/diwali-corporate-gifts`). Decide whether these merge into that hub, get their own hub page, or something else, before building real pages/routes.
6. **No per-product pages** — matches current site convention (cards + modal only). If you want individual URLs/SEO pages per product later, that's new work, not something this phase built.
7. **Flip `status`/`inStock`** — when ready, run `npm run import-diwali-2026-catalog -- --dry` first to preview, then without `--dry` to create the categories + products in Payload. New products import with `inStock: false` (Payload has no separate draft flag) so nothing shows on any live page until you flip it in the admin.
8. **Local dev launch entry** — I added a `diwali-2026-preview` entry to `.claude/launch.json` in your main checkout (`/Users/anandashok/mintbox-catalog/.claude/launch.json`) so the preview server for this branch can run on port 3010 without colliding with your other session's dev server on port 3000. It only runs `npm run dev` in the sibling worktree directory — no app behavior changed.

## Files created

Local-only (never sent to Payload/production):
- `scripts/supplier-data/product-list.ts` — the 50-product + 5-bulk-pack source list
- `scripts/supplier-data/catalog-plan.ts` — MintBox id/slug/name/category assignments
- `scripts/supplier-data/fetch-supplier-data.ts` + `diwali-2026-source.json` (normalized) + `raw/*.json` (gitignored)
- `scripts/supplier-data/download-and-process-images.ts`
- `scripts/supplier-data/build-copy-input-and-pricing.ts` + `copy-input.json` + `pricing-review.csv`
- `scripts/supplier-data/copy/batch-1.json` … `batch-5.json` (copywriting output, 10 products each)
- `scripts/supplier-data/assemble-local-dataset.ts` (generates `src/data/diwali2026Products.ts`)
- `scripts/supplier-data/check-no-supplier-leak.ts`
- `scripts/supplier-data/gen-review-table.ts`, `review-table.md`
- `scripts/supplier-data/REVIEW.md` (this file)
- `scripts/import-diwali-2026-catalog.ts` — **not yet run**, for when you're ready
- `src/config/pricing.ts`
- `src/data/diwali2026Products.ts` (generated, do not hand-edit)
- `src/app/(main)/dev-preview/diwali-2026-catalog/page.tsx`
- `src/components/pages/Diwali2026PreviewClient.tsx`
- `public/catalog/diwali-2026/<50 folders>/*.webp` (187 images)

## Files changed

- `.gitignore` — ignore `scripts/supplier-data/raw/` and `scripts/supplier-data/screenshots/`
- `package.json` — added `import-diwali-2026-catalog` script
- `/Users/anandashok/mintbox-catalog/.claude/launch.json` (main checkout, not this branch) — added the `diwali-2026-preview` dev server entry

Nothing else in the repo was touched. No git push, no deploy, no CMS/database write.
