/**
 * Restructures the Diwali category into one parent ("Diwali Gifting") with two
 * subcategories:
 *   - "Hampers & Boxes" - the existing category (id kept, slug kept as
 *     diwali-gift-boxes so nothing else that references it breaks), just
 *     renamed and given a parent.
 *   - "Products" (slug diwali-2026-products) - new, empty until
 *     import-diwali-2026-via-rest.ts populates it with the 50 new products.
 *
 * Uses the REST API - no local DB credentials needed. Writes log in as a
 * Payload admin via PAYLOAD_ADMIN_EMAIL / PAYLOAD_ADMIN_PASSWORD (see
 * scripts/lib/payloadAuth.ts); --dry needs no credentials. Run this
 * BEFORE import-diwali-2026-via-rest.ts.
 *
 * Usage:
 *   npx tsx scripts/migrate-diwali-gifting-categories.ts --dry
 *   npx tsx scripts/migrate-diwali-gifting-categories.ts
 */
import { authHeaders } from './lib/payloadAuth'

const BASE_URL = 'https://themintbox.in'
const LEGACY_SLUG = 'diwali-gift-boxes'
const PARENT_SLUG = 'diwali-gifting'
const PRODUCTS_SLUG = 'diwali-2026-products'
const DRY = process.argv.includes('--dry')

interface Category {
  id: number
  name: string
  slug: string
  parent?: number | Category | null
}

async function findBySlug(slug: string): Promise<Category | null> {
  const res = await fetch(`${BASE_URL}/api/categories?where[slug][equals]=${slug}&limit=1`)
  if (!res.ok) throw new Error(`Lookup failed for slug "${slug}": HTTP ${res.status}`)
  const data = await res.json()
  return data.docs?.[0] ?? null
}

async function createCategory(body: Record<string, unknown>): Promise<Category> {
  const res = await fetch(`${BASE_URL}/api/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(await authHeaders(BASE_URL)) },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Create failed: HTTP ${res.status} - ${(await res.text()).slice(0, 300)}`)
  const data = await res.json()
  return data.doc
}

async function updateCategory(id: number, body: Record<string, unknown>): Promise<Category> {
  const res = await fetch(`${BASE_URL}/api/categories/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...(await authHeaders(BASE_URL)) },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Update failed for id ${id}: HTTP ${res.status} - ${(await res.text()).slice(0, 300)}`)
  const data = await res.json()
  return data.doc
}

async function run() {
  console.log(`\nMigrating Diwali categories${DRY ? ' (DRY RUN)' : ''}\n`)

  const legacy = await findBySlug(LEGACY_SLUG)
  if (!legacy) throw new Error(`Legacy category "${LEGACY_SLUG}" not found - expected the existing 55-product category to already exist`)
  console.log(`  Found existing category: "${legacy.name}" (id ${legacy.id}, slug ${legacy.slug})`)

  let parent = await findBySlug(PARENT_SLUG)
  if (parent) {
    console.log(`  Parent "Diwali Gifting" already exists (id ${parent.id}) - skipping create`)
  } else if (DRY) {
    console.log(`  Would create parent category: Diwali Gifting (slug ${PARENT_SLUG})`)
  } else {
    parent = await createCategory({
      name: 'Diwali Gifting',
      slug: PARENT_SLUG,
      emoji: '🪔',
      order: 0,
      description: 'Corporate Diwali gifting: hampers, gift boxes, and individual gift products.',
    })
    console.log(`  Created parent category: Diwali Gifting (id ${parent.id})`)
  }

  if (legacy.parent) {
    console.log(`  "${legacy.name}" already has a parent set - skipping rename/parent update`)
  } else if (DRY) {
    console.log(`  Would rename "${legacy.name}" -> "Hampers & Boxes" and set parent (keeping slug "${legacy.slug}")`)
  } else {
    const parentId = parent!.id
    const updated = await updateCategory(legacy.id, { name: 'Hampers & Boxes', slug: legacy.slug, parent: parentId })
    console.log(`  Renamed to "${updated.name}", parent set to ${parentId}`)
  }

  let products = await findBySlug(PRODUCTS_SLUG)
  if (products) {
    console.log(`  "Products" subcategory already exists (id ${products.id}) - skipping create`)
  } else if (DRY) {
    console.log(`  Would create subcategory: Products (slug ${PRODUCTS_SLUG})`)
  } else {
    products = await createCategory({
      name: 'Products',
      slug: PRODUCTS_SLUG,
      emoji: '🎁',
      order: 1,
      parent: parent!.id,
      description: 'Individual Diwali and corporate gifting products: candles, urli, reed diffusers, aroma gift sets, decor and festive sets.',
    })
    console.log(`  Created subcategory: Products (id ${products.id})`)
  }

  console.log('\nDone.')
}

run().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
