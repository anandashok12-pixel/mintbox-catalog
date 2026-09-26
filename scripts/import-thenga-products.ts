/**
 * Import 27 coconut-shell products from "THENGA CATALOGUE Aug 2026 New.pdf" into
 * three existing categories (Home & Living, Desktop Accessories, Drinkware) plus a
 * new "Custom & Branded Merchandise" category for the trophy/tag/pin/keychain/magnet
 * items that don't fit anywhere existing.
 *
 * Images were extracted directly from the PDF's embedded photos (native resolution,
 * no re-render), center-cropped to square, resized to 900x900 and saved as
 * <slug>.jpg in IMAGES_DIR.
 *
 * This script talks to Postgres directly (via `pg`) and uploads to Vercel Blob
 * directly (via `@vercel/blob`'s put()) instead of calling getPayload() - the
 * same bypass used by scripts/generate-card-thumbnails.ts and
 * scripts/restructure-categories.ts - because getPayload() triggers Payload's
 * dev-mode drizzle-kit schema push, which currently crashes on this DB
 * (drizzle-orm#6256: composite-PK introspection query ships $1/$2 placeholders
 * with no bound params against the vercel-postgres/neon driver).
 *
 * Usage:
 *   npm run import-thenga-products              # create category + products
 *   npm run import-thenga-products -- --dry     # print what would happen, no writes
 *   npm run import-thenga-products -- --update  # also update price/desc/image on existing
 *
 * Idempotent: products matched by name; categories by slug; media by filename.
 */
import { Client } from 'pg'
import { put } from '@vercel/blob'
import fs from 'fs'
import path from 'path'

const IMAGES_DIR =
  process.env.THENGA_IMAGES_DIR ||
  '/private/tmp/claude-501/-Users-anandashok-mintbox-catalog/03db6111-6248-446b-ac5a-e594184b9a6e/scratchpad/thenga/products'

const NEW_CATEGORY = {
  name: 'Custom & Branded Merchandise',
  slug: 'custom-branded-merchandise',
  emoji: '🏷️',
  order: 18,
  description:
    'Small customisable coconut-shell items for HR rewards, events and return gifts - trophies, keychains, lapel pins, gift tags and fridge magnets, each brandable with a logo or name.',
}

type CategorySlug = 'home-living' | 'desktop-accessories' | 'drinkware' | 'custom-branded-merchandise'

type Item = {
  slug: string
  name: string
  supplierPrice: number
  categorySlug: CategorySlug
  desc: string
  customisable: boolean
}

// selling price = supplier catalogue price x 1.2, ex-GST (Anand, 2026-09-26)
const MARKUP = 1.2

const ITEMS: Item[] = [
  // --- Home & Living ---
  { slug: 'marigold-mini-candle', name: 'Marigold Mini Candle', supplierPrice: 120, categorySlug: 'home-living', customisable: false,
    desc: '1 candle, 80gm capacity. Diameter 8 cm, height 5 cm, topped with marigold petals and golden flakes - the most festive-looking candle in the range, perfect for Diwali hampers.' },
  { slug: 'exotic-candle-holder', name: 'Exotic Candle Holder', supplierPrice: 225, categorySlug: 'home-living', customisable: false,
    desc: 'Perforated coconut-shell candle holder, diameter 8-9 cm, height 10 cm. Throws warm light patterns through the shell - a hero piece for a festive or premium gift box. Holds a tea light candle.' },
  { slug: 'tropical-candle-holder', name: 'Tropical Candle Holder', supplierPrice: 225, categorySlug: 'home-living', customisable: false,
    desc: 'Perforated coconut-shell candle holder, diameter 8-9 cm, height 10 cm. Companion piece to the Exotic Candle Holder with a different perforation pattern. Holds a tea light candle.' },
  { slug: 'spice-candle', name: 'Spice Candle', supplierPrice: 140, categorySlug: 'home-living', customisable: false,
    desc: '1 candle, 130-150gm capacity. Diameter 10 cm, height 6 cm, set with whole spices (cinnamon, star anise, cardamom, cloves) for a warm festive fragrance.' },
  { slug: 'orange-pepper-candle', name: 'Orange Pepper Candle', supplierPrice: 140, categorySlug: 'home-living', customisable: false,
    desc: '1 candle, 130-150gm capacity. Diameter 10 cm, height 6 cm, topped with a dried orange slice and peppercorns. Pairs well with the Spice Candle.' },
  { slug: 'dhoop-stand', name: 'Dhoop Stand', supplierPrice: 160, categorySlug: 'home-living', customisable: false,
    desc: '2-piece coconut shell dhoop stand - bowl-like bottom with a perforated top shell to light dhoop. Puja-adjacent, relevant for festive gifting year-round.' },
  { slug: 'incense-holder', name: 'Incense Holder', supplierPrice: 150, categorySlug: 'home-living', customisable: false,
    desc: 'Coconut-shell incense/agarbatti holder, height 11 cm. Puja-adjacent decor piece, relevant for festive gifting.' },
  { slug: 'coconut-shell-boat', name: 'Coconut Shell Boat', supplierPrice: 30, categorySlug: 'home-living', customisable: false,
    desc: 'Half coconut shell shaped as a serving boat. Purpose: serving starters, snacks and festive treats - a cheap filler piece for mithai or dry fruits inside a hamper.' },
  { slug: 'ceramic-bowls-tray', name: 'Ceramic Bowls & Tray', supplierPrice: 900, categorySlug: 'home-living', customisable: false,
    desc: '3 ceramic bowls on 1 wooden base tray, length 35 cm, width 13 cm. Purpose: serving dry fruits - the most premium-looking piece in the range, a strong anchor for a mid-to-premium gift box.' },
  { slug: 'wooden-lid-container', name: 'Wooden Lid Container', supplierPrice: 250, categorySlug: 'home-living', customisable: false,
    desc: '1 coconut shell with a coconut-wood lid, diameter 9 cm, height 11 cm. Airtight container for storing dry fruits or other dry items - fill it and it becomes an instant premium gift.' },
  { slug: 'cork-lid-container', name: 'Cork Lid Container', supplierPrice: 135, categorySlug: 'home-living', customisable: false,
    desc: '1 coconut shell with a cork lid, diameter 8 cm, height 10-11 cm. Airtight container for storing dry items.' },
  { slug: 'natural-cream-round-bowl', name: 'Natural Cream Round Bowl', supplierPrice: 240, categorySlug: 'home-living', customisable: false,
    desc: '1 bowl, diameter 10-11 cm, height 7 cm. Coated in cream enamel for serving dry fruits, nuts and snacks.' },
  { slug: 'raw-white-round-bowl', name: 'Raw White Round Bowl', supplierPrice: 200, categorySlug: 'home-living', customisable: false,
    desc: '1 bowl, diameter 10-11 cm, height 7 cm. Raw white-finish coconut shell bowl for serving dry fruits.' },
  { slug: 'handpainted-bowl-stand', name: 'Handpainted Bowl with Stand', supplierPrice: 500, categorySlug: 'home-living', customisable: false,
    desc: '1 hand-painted coconut shell bowl on a metal stand, diameter 14-15 cm, height 7-8 cm. For serving salads, smoothies or fruits - the best statement piece for a premium box.' },
  { slug: 'mini-handpainted-bowl', name: 'Mini Handpainted Bowl', supplierPrice: 200, categorySlug: 'home-living', customisable: false,
    desc: '1 hand-painted coconut shell bowl, diameter 9-10 cm, height 5 cm. For serving dessert, chutney or dips.' },
  { slug: 'green-enamel-bowl', name: 'Green Enamel Bowl', supplierPrice: 300, categorySlug: 'home-living', customisable: false,
    desc: '1 900ml bowl, diameter 14-15 cm, height 7-8 cm, finished in glossy green enamel. For serving salads, smoothies or fruits - a very Instagrammable piece.' },
  { slug: 'mini-enamel-bowl', name: 'Mini Enamel Bowl', supplierPrice: 175, categorySlug: 'home-living', customisable: false,
    desc: '1 enamel-finished coconut shell bowl, available in 4 pastel colours - off white, beige, baby pink, baby blue.' },

  // --- Desktop Accessories ---
  { slug: 'coconut-clock', name: 'Coconut Clock', supplierPrice: 270, categorySlug: 'desktop-accessories', customisable: false,
    desc: 'Coconut-shell tile clock with brass needles, 9 cm x 9 cm. A desk clock for the work or study table - part of the natural desk-set trio with the Pen Holder and Mobile Holder.' },
  { slug: 'pen-holder', name: 'Pen Holder', supplierPrice: 150, categorySlug: 'desktop-accessories', customisable: false,
    desc: 'Polished coconut shell pen holder, height 11 cm. Holds pens and markers for home or office.' },
  { slug: 'mobile-holder', name: 'Mobile Holder', supplierPrice: 150, categorySlug: 'desktop-accessories', customisable: false,
    desc: 'Coconut shell mobile stand, height 7 cm. Holds a phone in portrait or landscape mode on a desk.' },

  // --- Drinkware ---
  { slug: 'coffee-mug-coaster', name: 'Coffee Mug with Coaster', supplierPrice: 280, categorySlug: 'drinkware', customisable: false,
    desc: '1 coconut shell mug with handle and matching wooden coaster, diameter 8 cm, height 11 cm. For drinking tea, coffee or juice.' },
  { slug: 'teacup', name: 'Teacup', supplierPrice: 160, categorySlug: 'drinkware', customisable: false,
    desc: '1 coconut shell teacup with wooden handle, diameter 6-7 cm, height 8 cm. For drinking tea or coffee.' },

  // --- Custom & Branded Merchandise (new category) ---
  { slug: 'coconut-shell-trophy', name: 'Coconut Shell Trophy', supplierPrice: 350, categorySlug: 'custom-branded-merchandise', customisable: true,
    desc: 'Coconut shell trophy on a wooden base, customisable with any logo, award name and recipient name. An evergreen HR rewards-and-recognition piece, not tied to any one season.' },
  { slug: 'thenga-gift-tag', name: 'Thenga Gift Tag', supplierPrice: 50, categorySlug: 'custom-branded-merchandise', customisable: true,
    desc: 'Coconut shell gift tag, 2 inches, customisable with any name or logo. Ties onto any hamper to make the whole gift feel custom, for a small add-on cost.' },
  { slug: 'thenga-lapel-pin', name: 'Thenga Lapel Pin', supplierPrice: 80, categorySlug: 'custom-branded-merchandise', customisable: true,
    desc: 'Magnetic coconut shell lapel pin, 3 inches, for business events. Customisable with any logo or name.' },
  { slug: 'polished-keychain', name: 'Polished Keychain', supplierPrice: 70, categorySlug: 'custom-branded-merchandise', customisable: true,
    desc: 'Polished coconut shell keychain, 1.7 inch, attached with a metal chain. Customisable with any logo or name - suited to onboarding kits, events and conference giveaways.' },
  { slug: 'fridge-magnet', name: 'Fridge Magnet', supplierPrice: 100, categorySlug: 'custom-branded-merchandise', customisable: true,
    desc: 'Magnetic coconut shell fridge magnet, 2.5 inches, customisable with any name or logo for return gifts or souvenirs.' },
]

const DRY = process.argv.includes('--dry')
const UPDATE = process.argv.includes('--update')

function blobBaseUrl(token: string): string {
  const storeId = token.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]?.toLowerCase()
  if (!storeId) throw new Error('BLOB_READ_WRITE_TOKEN is not a vercel_blob_rw_<store>_<secret> token')
  return `https://${storeId}.public.blob.vercel-storage.com`
}

async function main() {
  if (ITEMS.length !== 27) throw new Error(`Expected 27 items, got ${ITEMS.length}`)
  const missing = ITEMS.filter((it) => !fs.existsSync(path.join(IMAGES_DIR, `${it.slug}.jpg`)))
  if (missing.length) throw new Error(`Missing images: ${missing.map((it) => it.slug).join(', ')}`)

  const connectionString = (process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL || '')
    .replace(/\\n/g, '')
    .trim()
  const token = process.env.BLOB_READ_WRITE_TOKEN || ''
  if (!connectionString) throw new Error('POSTGRES_URL missing (run with --env-file=.env.local)')
  if (!token) throw new Error('BLOB_READ_WRITE_TOKEN missing')
  const baseUrl = blobBaseUrl(token)

  const db = new Client({ connectionString })
  await db.connect()
  console.log(`\n🥥 Importing ${ITEMS.length} Thenga products${DRY ? ' (DRY RUN)' : ''}\n`)

  try {
    // --- categories: resolve existing by slug, create the one new one ---
    const neededSlugs = Array.from(new Set(ITEMS.map((it) => it.categorySlug)))
    const categoryIds: Record<string, number> = {}
    for (const slug of neededSlugs) {
      const { rows } = await db.query('select id from categories where slug = $1', [slug])
      if (rows.length) {
        categoryIds[slug] = rows[0].id
        console.log(`  ⏭  Category exists: ${slug} (id ${categoryIds[slug]})`)
        continue
      }
      if (slug !== NEW_CATEGORY.slug) throw new Error(`Expected existing category '${slug}' not found`)
      if (DRY) {
        categoryIds[slug] = -1
        console.log(`  ➕ Would create category: ${NEW_CATEGORY.name}`)
      } else {
        const { rows: created } = await db.query(
          `INSERT INTO categories (name, slug, emoji, "order", description, updated_at, created_at)
           VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
           ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
           RETURNING id`,
          [NEW_CATEGORY.name, NEW_CATEGORY.slug, NEW_CATEGORY.emoji, NEW_CATEGORY.order, NEW_CATEGORY.description],
        )
        categoryIds[slug] = created[0].id
        console.log(`  ✅ Created category: ${NEW_CATEGORY.name} (id ${categoryIds[slug]})`)
      }
    }

    // --- media ---
    async function getOrUploadImage(item: Item): Promise<number | null> {
      const filename = `thenga-${item.slug}.jpg`
      const { rows: existing } = await db.query('select id from media where filename = $1', [filename])
      if (existing.length) return existing[0].id
      if (DRY) return null
      const buffer = fs.readFileSync(path.join(IMAGES_DIR, `${item.slug}.jpg`))
      await put(filename, buffer, {
        access: 'public',
        addRandomSuffix: false,
        contentType: 'image/jpeg',
        cacheControlMaxAge: 60 * 60 * 24 * 365,
        token,
      })
      const url = `${baseUrl}/${encodeURIComponent(filename)}`
      const { rows: created } = await db.query(
        `INSERT INTO media (alt, url, filename, mime_type, filesize, width, height, focal_x, focal_y, updated_at, created_at)
         VALUES ($1, $2, $3, 'image/jpeg', $4, 900, 900, 50, 50, NOW(), NOW())
         RETURNING id`,
        [`${item.name} - coconut shell corporate gift`, url, filename, buffer.length],
      )
      return created[0].id
    }

    // --- products ---
    let created = 0, updated = 0, skipped = 0
    const orderCounters: Record<string, number> = {}
    for (const item of ITEMS) {
      const sellingPrice = Math.round(item.supplierPrice * MARKUP)
      const { rows: existing } = await db.query('select id from products where name = $1', [item.name])
      orderCounters[item.categorySlug] = (orderCounters[item.categorySlug] || 0) + 1
      const order = orderCounters[item.categorySlug]

      if (existing.length) {
        if (!UPDATE) { console.log(`  ⏭  Exists: ${item.name}`); skipped++; continue }
        if (!DRY) {
          const imageId = await getOrUploadImage(item)
          await db.query(
            `UPDATE products SET category_id = $1, price = $2, description = $3, moq = 5,
               customisable = $4, in_stock = true, "order" = $5, updated_at = NOW()
               ${imageId ? ', image_id = $6' : ''}
             WHERE id = $${imageId ? 7 : 6}`,
            imageId
              ? [categoryIds[item.categorySlug], sellingPrice, item.desc, item.customisable, order, imageId, existing[0].id]
              : [categoryIds[item.categorySlug], sellingPrice, item.desc, item.customisable, order, existing[0].id],
          )
        }
        console.log(`  🔄 Updated: ${item.name}`); updated++; continue
      }

      if (DRY) { console.log(`  ➕ Would create: ₹${sellingPrice} ${item.name} [${item.categorySlug}]`); created++; continue }
      const imageId = await getOrUploadImage(item)
      await db.query(
        `INSERT INTO products (name, category_id, price, image_id, description, moq, customisable, in_stock, "order", updated_at, created_at)
         VALUES ($1, $2, $3, $4, $5, 5, $6, true, $7, NOW(), NOW())`,
        [item.name, categoryIds[item.categorySlug], sellingPrice, imageId, item.desc, item.customisable, order],
      )
      console.log(`  ✅ Created: ₹${sellingPrice} ${item.name} [${item.categorySlug}]`); created++
    }

    console.log(`\n🎉 Done. Created ${created}, updated ${updated}, skipped ${skipped}.`)
  } finally {
    await db.end()
  }
}

main().catch((err) => { console.error('Failed:', err); process.exit(1) })
