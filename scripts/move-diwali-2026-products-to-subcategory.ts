/**
 * One-time fix: the 50 Diwali 2026 products were created (2026-09-26) before
 * the "Products" subcategory existed, so import-diwali-2026-via-rest.ts's
 * name-based idempotency check later skipped them instead of moving them.
 * This re-points each one's `category` from the old flat category (92,
 * "Hampers & Boxes") to the new "Products" subcategory (95), by exact name
 * match against the known list. Pure data update via the public REST API -
 * no schema involved.
 *
 * Usage:
 *   npx tsx scripts/move-diwali-2026-products-to-subcategory.ts --dry
 *   npx tsx scripts/move-diwali-2026-products-to-subcategory.ts
 */
import { authHeaders } from './lib/payloadAuth'
import { DIWALI_2026_PRODUCTS } from '../src/data/diwali2026Products'

const BASE_URL = 'https://themintbox.in'
const TARGET_CATEGORY_SLUG = 'diwali-2026-products'
const DRY = process.argv.includes('--dry')

async function getCategoryId(slug: string): Promise<number> {
  const res = await fetch(`${BASE_URL}/api/categories?where[slug][equals]=${slug}&limit=1`)
  if (!res.ok) throw new Error(`Category lookup failed: HTTP ${res.status}`)
  const data = await res.json()
  const doc = data.docs?.[0]
  if (!doc) throw new Error(`Category "${slug}" not found`)
  return doc.id
}

async function findProductByName(name: string): Promise<{ id: number; category: number } | null> {
  const res = await fetch(`${BASE_URL}/api/products?where[name][equals]=${encodeURIComponent(name)}&limit=1&depth=0`)
  if (!res.ok) throw new Error(`Product lookup failed for "${name}": HTTP ${res.status}`)
  const data = await res.json()
  const doc = data.docs?.[0]
  return doc ? { id: doc.id, category: doc.category } : null
}

async function moveProduct(id: number, categoryId: number) {
  const res = await fetch(`${BASE_URL}/api/products/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...(await authHeaders(BASE_URL)) },
    body: JSON.stringify({ category: categoryId }),
  })
  if (!res.ok) throw new Error(`Move failed for product id ${id}: HTTP ${res.status} - ${(await res.text()).slice(0, 300)}`)
}

async function run() {
  console.log(`\nMoving ${DIWALI_2026_PRODUCTS.length} products into "${TARGET_CATEGORY_SLUG}"${DRY ? ' (DRY RUN)' : ''}\n`)

  const targetId = await getCategoryId(TARGET_CATEGORY_SLUG)
  console.log(`  Target category id: ${targetId}`)

  let moved = 0, alreadyThere = 0, notFound = 0, failed = 0
  for (const p of DIWALI_2026_PRODUCTS) {
    try {
      const existing = await findProductByName(p.name)
      if (!existing) {
        console.log(`  NOT FOUND: ${p.name}`)
        notFound++
        continue
      }
      if (existing.category === targetId) {
        console.log(`  Already in target category: ${p.name}`)
        alreadyThere++
        continue
      }
      if (DRY) {
        console.log(`  Would move: ${p.name} (id ${existing.id}) from category ${existing.category} -> ${targetId}`)
        moved++
        continue
      }
      await moveProduct(existing.id, targetId)
      console.log(`  Moved: ${p.name}`)
      moved++
    } catch (err) {
      console.error(`  FAILED: ${p.name} - ${String(err)}`)
      failed++
    }
    await new Promise(r => setTimeout(r, 150))
  }

  console.log(`\nDone. Moved ${moved}, already there ${alreadyThere}, not found ${notFound}, failed ${failed}.`)
}

run().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
