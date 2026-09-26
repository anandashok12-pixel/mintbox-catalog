/**
 * One-time import of the 50 Diwali 2026 / corporate gifting products (candles,
 * urli, reed diffusers, aroma gift sets, decor, festive sets) into Payload,
 * once Anand has reviewed copy, pricing and image rights on the local preview
 * at /dev-preview/diwali-2026-catalog.
 *
 * DO NOT RUN until:
 *   1. Pricing multiplier in src/config/pricing.ts is finalised (not the 2.2x placeholder).
 *   2. Image rights are confirmed with the supplier, or images are replaced with
 *      MintBox-owned photography (imageStatus flips to "mintbox-owned").
 *   3. Copy in src/data/diwali2026Products.ts has been read and approved.
 *
 * New products are created with inStock: false (Payload has no separate
 * draft/publish field - this is the closest equivalent) so nothing appears on
 * any live page until flipped to true in the admin.
 *
 * Usage:
 *   npm run import-diwali-2026-catalog -- --dry     # print what would happen
 *   npm run import-diwali-2026-catalog              # create categories + products
 *
 * Idempotent: products matched by name; categories by slug; media by filename.
 */
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import fs from 'fs'
import path from 'path'
import { DIWALI_2026_CATEGORIES, DIWALI_2026_PRODUCTS } from '../src/data/diwali2026Products'

const IMAGES_ROOT = path.join(__dirname, '..', 'public', 'catalog', 'diwali-2026')
const DRY = process.argv.includes('--dry')

async function run() {
  const payload = await getPayload({ config: configPromise })
  console.log(`\nImporting ${DIWALI_2026_PRODUCTS.length} Diwali 2026 products across ${DIWALI_2026_CATEGORIES.length} categories${DRY ? ' (DRY RUN)' : ''}\n`)

  const categoryIds = new Map<string, number>()
  for (const cat of DIWALI_2026_CATEGORIES) {
    const existing = await payload.find({ collection: 'categories', where: { slug: { equals: cat.slug } } })
    if (existing.docs.length) {
      categoryIds.set(cat.slug, existing.docs[0].id as number)
      console.log(`  Category exists: ${cat.name} (id ${existing.docs[0].id})`)
      continue
    }
    if (DRY) {
      console.log(`  Would create category: ${cat.name}`)
      continue
    }
    const created = await payload.create({
      collection: 'categories',
      data: { name: cat.name, emoji: cat.emoji ?? undefined, description: `${cat.name} for Diwali 2026 and corporate gifting.` },
    })
    categoryIds.set(cat.slug, created.id as number)
    console.log(`  Created category: ${cat.name} (id ${created.id})`)
  }

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
    const categoryId = categoryIds.get(p.category.slug)
    if (!categoryId && !DRY) throw new Error(`No category id resolved for slug ${p.category.slug}`)

    const existing = await payload.find({ collection: 'products', where: { name: { equals: p.name } } })
    if (existing.docs.length) {
      console.log(`  Exists, skipping: ${p.name}`)
      skipped++
      continue
    }
    if (DRY) {
      console.log(`  Would create: ${p.name} - ${p.category.name} - inStock:false`)
      created++
      continue
    }
    const imageFilename = path.basename(p.image.url)
    const imageId = await getOrUploadImage(p.slug, imageFilename)
    await payload.create({
      collection: 'products',
      data: {
        name: p.name,
        category: categoryId!,
        price: p.price,
        description: p.description,
        features: p.features,
        moq: p.moq,
        customisable: p.customisable,
        inStock: false, // flip to true in admin once approved for launch
        order: i + 1,
        ...(imageId ? { image: imageId } : {}),
      },
    })
    console.log(`  Created: ${p.name}`)
    created++
  }

  console.log(`\nDone. Created ${created}, skipped ${skipped}.`)
  process.exit(0)
}

run().catch(err => {
  console.error('Failed:', err)
  process.exit(1)
})
