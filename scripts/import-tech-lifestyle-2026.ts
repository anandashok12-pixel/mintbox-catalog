/**
 * Pushes the 20 tech/lifestyle products + 3 bundles (Sep 2026 brief) LIVE into
 * their existing categories (electronics, audio, desktop-accessories,
 * bags-travel-accessories, executive-sets - none created, all already exist).
 * Goes through the public REST API rather than getPayload() directly, same
 * approach as scripts/import-diwali-2026-via-rest.ts, since a local drizzle-kit/
 * @neondatabase-serverless bug breaks getPayload()'s schema-introspection step
 * on this machine (documented there, reproduces on Node 22 and 26, unrelated
 * to this script).
 *
 * No real product photos yet - each product uses its `emoji` as a fallback.
 * See the end of this file's console output for the placeholder list.
 *
 * Usage:
 *   npx tsx scripts/import-tech-lifestyle-2026.ts --dry     # print only, no writes
 *   npx tsx scripts/import-tech-lifestyle-2026.ts           # create products live
 *
 * Idempotent: products matched by name.
 */
import { TECH_LIFESTYLE_2026_PRODUCTS } from '../src/data/techLifestyle2026Products'

const BASE_URL = 'https://themintbox.in'
const DRY = process.argv.includes('--dry')

async function getCategoryId(slug: string): Promise<number> {
  const res = await fetch(`${BASE_URL}/api/categories?where[slug][equals]=${slug}&limit=1`)
  if (!res.ok) throw new Error(`Failed to fetch category "${slug}": HTTP ${res.status}`)
  const data = await res.json()
  const doc = data.docs?.[0]
  if (!doc) throw new Error(`Category "${slug}" not found on live site - expected it to already exist`)
  return doc.id
}

async function getMaxOrder(categoryId: number): Promise<number> {
  const res = await fetch(
    `${BASE_URL}/api/products?where[category][equals]=${categoryId}&sort=-order&limit=1`,
  )
  if (!res.ok) throw new Error(`Failed to fetch max order for category ${categoryId}: HTTP ${res.status}`)
  const data = await res.json()
  return data.docs?.[0]?.order ?? 0
}

async function findExistingProduct(name: string): Promise<boolean> {
  const res = await fetch(`${BASE_URL}/api/products?where[name][equals]=${encodeURIComponent(name)}&limit=1`)
  if (!res.ok) throw new Error(`Failed to check existing product "${name}": HTTP ${res.status}`)
  const data = await res.json()
  return (data.docs?.length ?? 0) > 0
}

async function createProduct(categoryId: number, p: (typeof TECH_LIFESTYLE_2026_PRODUCTS)[number], order: number) {
  const res = await fetch(`${BASE_URL}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: p.name,
      category: categoryId,
      price: p.price,
      emoji: p.emoji,
      description: p.description,
      features: p.features.map(feature => ({ feature })),
      moq: p.moq,
      customisable: p.customisable,
      inStock: p.inStock,
      order,
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Product create failed for "${p.name}": HTTP ${res.status} - ${text.slice(0, 500)}`)
  }
  return res.json()
}

async function run() {
  console.log(
    `\nPushing ${TECH_LIFESTYLE_2026_PRODUCTS.length} tech/lifestyle products LIVE to ${BASE_URL}${DRY ? ' (DRY RUN)' : ''}\n`,
  )

  const categorySlugs = [...new Set(TECH_LIFESTYLE_2026_PRODUCTS.map(p => p.categorySlug))]
  const categoryIds = new Map<string, number>()
  const nextOrder = new Map<string, number>()
  for (const slug of categorySlugs) {
    const id = await getCategoryId(slug)
    categoryIds.set(slug, id)
    nextOrder.set(slug, (await getMaxOrder(id)) + 1)
    console.log(`  Category "${slug}": id ${id}, next order ${nextOrder.get(slug)}`)
  }

  let created = 0
  let skipped = 0
  let failed = 0
  const placeholderImageSlugs: string[] = []

  for (const p of TECH_LIFESTYLE_2026_PRODUCTS) {
    try {
      if (await findExistingProduct(p.name)) {
        console.log(`  Exists, skipping: ${p.name}`)
        skipped++
        continue
      }
      const categoryId = categoryIds.get(p.categorySlug)!
      const order = nextOrder.get(p.categorySlug)!
      if (DRY) {
        console.log(
          `  Would create: ${p.name} - ₹${p.price} - category:${p.categorySlug} - order:${order} - inStock:${p.inStock} - emoji fallback:${p.emoji}`,
        )
      } else {
        await createProduct(categoryId, p, order)
        console.log(`  Created (LIVE): ${p.name} - ₹${p.price} - category:${p.categorySlug}`)
      }
      nextOrder.set(p.categorySlug, order + 1)
      placeholderImageSlugs.push(p.slug)
      created++
    } catch (err) {
      console.error(`  FAILED: ${p.name} - ${String(err)}`)
      failed++
    }
    await new Promise(r => setTimeout(r, 200))
  }

  console.log(`\nDone. Created ${created}, skipped ${skipped}, failed ${failed}.`)
  console.log(`\nPlaceholder image slots to source real photos for (${placeholderImageSlugs.length}):`)
  for (const slug of placeholderImageSlugs) console.log(`  - ${slug}`)
  if (failed > 0) process.exitCode = 1
}

run().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
