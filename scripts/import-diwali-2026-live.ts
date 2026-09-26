/**
 * Pushes the 50 Diwali 2026 / corporate gifting products LIVE into the
 * existing "Diwali Gift Boxes" category (slug: diwali-gift-boxes) - the same
 * category the 55 DK boxes already live in on /diwali-corporate-gifts and
 * /catalog. Unlike scripts/import-diwali-2026-catalog.ts (which creates 6 new
 * categories with inStock: false for a staged rollout), this script:
 *   - requires the diwali-gift-boxes category to already exist (does not create it)
 *   - sets inStock: true, so products are publicly visible immediately
 *   - orders new products after the existing 55 (order 56-105)
 *
 * Images used are still the local supplier-reference photos in
 * public/catalog/diwali-2026/ - several of these visibly show the supplier's
 * own branding (confirmed with Anand, proceeding anyway per his explicit
 * instruction on 2026-09-26).
 *
 * Usage:
 *   npm run import-diwali-2026-live -- --dry     # print what would happen, no writes
 *   npm run import-diwali-2026-live              # create products live
 *
 * Idempotent: products matched by name; media by filename.
 *
 * KNOWN ISSUE (2026-09-26): getPayload() currently fails locally on this
 * machine during its schema-introspection step (a drizzle-kit /
 * @neondatabase/serverless incompatibility, reproduces on Node 22 and 26,
 * unrelated to this script) before any product-creation logic runs. Until
 * that's fixed, use scripts/import-diwali-2026-via-rest.ts instead, which
 * writes through the public REST API and needs no local DB connection.
 */
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import fs from 'fs'
import path from 'path'
import { DIWALI_2026_PRODUCTS } from '../src/data/diwali2026Products'

const CATEGORY_SLUG = 'diwali-gift-boxes'
const ORDER_START = 56 // existing 55 DK boxes use order 1-55
const IMAGES_ROOT = path.join(__dirname, '..', 'public', 'catalog', 'diwali-2026')
const DRY = process.argv.includes('--dry')

async function run() {
  const payload = await getPayload({ config: configPromise })
  console.log(`\nPushing ${DIWALI_2026_PRODUCTS.length} products LIVE into category "${CATEGORY_SLUG}"${DRY ? ' (DRY RUN)' : ''}\n`)

  const cats = await payload.find({ collection: 'categories', where: { slug: { equals: CATEGORY_SLUG } }, limit: 1 })
  const category = cats.docs[0]
  if (!category) {
    throw new Error(`Category "${CATEGORY_SLUG}" does not exist yet - expected it to already exist (created by scripts/import-diwali-boxes.ts). Aborting rather than creating it fresh.`)
  }
  const categoryId = category.id as number
  console.log(`  Using existing category: ${category.name ?? CATEGORY_SLUG} (id ${categoryId})`)

  async function getOrUploadImage(slug: string, filename: string): Promise<number | null> {
    const existing = await payload.find({ collection: 'media', where: { filename: { equals: filename } } })
    if (existing.docs.length) return existing.docs[0].id as number
    if (DRY) return null
    const filePath = path.join(IMAGES_ROOT, slug, filename)
    if (!fs.existsSync(filePath)) return null
    const buffer = fs.readFileSync(filePath)
    const media = await payload.create({
      collection: 'media',
      data: { alt: `${slug} - MintBox Diwali 2026 gift` },
      file: { data: buffer, mimetype: 'image/webp', name: filename, size: buffer.length },
    })
    return media.id as number
  }

  let created = 0, skipped = 0
  for (let i = 0; i < DIWALI_2026_PRODUCTS.length; i++) {
    const p = DIWALI_2026_PRODUCTS[i]
    const existing = await payload.find({ collection: 'products', where: { name: { equals: p.name } } })
    if (existing.docs.length) {
      console.log(`  Exists, skipping: ${p.name}`)
      skipped++
      continue
    }
    if (DRY) {
      console.log(`  Would create: ${p.name} - ₹${p.price} - inStock:true - order:${ORDER_START + i}`)
      created++
      continue
    }
    const imageFilename = path.basename(p.image.url)
    const imageId = await getOrUploadImage(p.slug, imageFilename)
    await payload.create({
      collection: 'products',
      data: {
        name: p.name,
        category: categoryId,
        price: p.price,
        description: p.description,
        features: p.features,
        moq: p.moq,
        customisable: p.customisable,
        inStock: true,
        order: ORDER_START + i,
        ...(imageId ? { image: imageId } : {}),
      },
    })
    console.log(`  Created (LIVE): ${p.name}`)
    created++
  }

  console.log(`\nDone. Created ${created}, skipped ${skipped}.`)
  process.exit(0)
}

run().catch(err => {
  console.error('Failed:', err)
  process.exit(1)
})
