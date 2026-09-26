/**
 * Pushes the 50 Diwali 2026 / corporate gifting products LIVE into the
 * existing "Diwali Gift Boxes" category on themintbox.in, via Payload's public
 * REST API rather than a direct DB connection. Local CLI scripts using
 * getPayload() directly hit a drizzle-kit/@neondatabase-serverless bug during
 * schema introspection (unrelated to this task, reproduces on both Node 22 and
 * 26) - the Products/Categories/Media collections all have public `create`
 * access (matching how the live site's own lead-capture flow writes data), so
 * this goes straight to the same API the deployed app itself uses. No local
 * DB credentials needed at all.
 *
 * Usage:
 *   npx tsx scripts/import-diwali-2026-via-rest.ts --dry
 *   npx tsx scripts/import-diwali-2026-via-rest.ts
 */
import fs from 'fs'
import path from 'path'
import { DIWALI_2026_PRODUCTS } from '../src/data/diwali2026Products'

const BASE_URL = 'https://themintbox.in'
// "Products" subcategory under the "Diwali Gifting" parent (sibling of the
// renamed "Hampers & Boxes" category, which keeps the old 55 DK boxes and the
// old diwali-gift-boxes slug). Run scripts/migrate-diwali-gifting-categories.ts
// first to create this structure - this script fails fast if it's missing.
const CATEGORY_SLUG = 'diwali-2026-products'
const ORDER_START = 1
const IMAGES_ROOT = path.join(__dirname, '..', 'public', 'catalog', 'diwali-2026')
const DRY = process.argv.includes('--dry')

async function getCategoryId(): Promise<number> {
  const res = await fetch(`${BASE_URL}/api/categories?where[slug][equals]=${CATEGORY_SLUG}&limit=1`)
  if (!res.ok) throw new Error(`Failed to fetch category: HTTP ${res.status}`)
  const data = await res.json()
  const doc = data.docs?.[0]
  if (!doc) throw new Error(`Category "${CATEGORY_SLUG}" not found on live site`)
  return doc.id
}

async function findExistingProduct(name: string): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/api/products?where[name][equals]=${encodeURIComponent(name)}&limit=1`)
  if (!res.ok) throw new Error(`Failed to check existing product "${name}": HTTP ${res.status}`)
  const data = await res.json()
  return (data.docs?.length ?? 0) > 0
}

async function uploadImage(slug: string, filename: string, alt: string): Promise<number | null> {
  const filePath = path.join(IMAGES_ROOT, slug, filename)
  if (!fs.existsSync(filePath)) return null
  const buffer = fs.readFileSync(filePath)
  const form = new FormData()
  form.append('file', new Blob([buffer], { type: 'image/webp' }), filename)
  form.append('_payload', JSON.stringify({ alt }))
  const res = await fetch(`${BASE_URL}/api/media`, { method: 'POST', body: form })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Media upload failed for ${filename}: HTTP ${res.status} - ${text.slice(0, 300)}`)
  }
  const data = await res.json()
  return data.doc?.id ?? null
}

async function createProduct(categoryId: number, p: (typeof DIWALI_2026_PRODUCTS)[number], order: number, imageId: number | null) {
  const res = await fetch(`${BASE_URL}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: p.name,
      category: categoryId,
      price: p.price,
      description: p.description,
      features: p.features,
      moq: p.moq,
      customisable: p.customisable,
      inStock: true,
      order,
      ...(imageId ? { image: imageId } : {}),
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Product create failed for "${p.name}": HTTP ${res.status} - ${text.slice(0, 500)}`)
  }
  return res.json()
}

async function run() {
  console.log(`\nPushing ${DIWALI_2026_PRODUCTS.length} products LIVE to ${BASE_URL} into category "${CATEGORY_SLUG}"${DRY ? ' (DRY RUN)' : ''}\n`)

  const categoryId = await getCategoryId()
  console.log(`  Using live category id: ${categoryId}`)

  let created = 0, skipped = 0, failed = 0
  for (let i = 0; i < DIWALI_2026_PRODUCTS.length; i++) {
    const p = DIWALI_2026_PRODUCTS[i]
    const order = ORDER_START + i
    try {
      if (await findExistingProduct(p.name)) {
        console.log(`  Exists, skipping: ${p.name}`)
        skipped++
        continue
      }
      if (DRY) {
        console.log(`  Would create: ${p.name} - ₹${p.price} - order:${order} - image:${path.basename(p.image.url)}`)
        created++
        continue
      }
      const imageId = await uploadImage(p.slug, path.basename(p.image.url), p.image.alt)
      await createProduct(categoryId, p, order, imageId)
      console.log(`  Created (LIVE): ${p.name}`)
      created++
    } catch (err) {
      console.error(`  FAILED: ${p.name} - ${String(err)}`)
      failed++
    }
    await new Promise(r => setTimeout(r, 200))
  }

  console.log(`\nDone. Created ${created}, skipped ${skipped}, failed ${failed}.`)
  if (failed > 0) process.exitCode = 1
}

run().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
