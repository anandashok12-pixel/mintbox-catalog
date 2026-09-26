/**
 * Import the 113 gift sets from "Price Gift Sets.pdf" into the Executive Sets category.
 *
 * Run `npm run build-gift-set-images` first - it writes one clean <key>.jpg per set
 * (product shot + code/title + contents, no price overlay, one box per image).
 *
 * Usage:
 *   npm run import-gift-sets             # create products
 *   npm run import-gift-sets -- --dry    # print what would happen, no writes
 *   npm run import-gift-sets -- --update # also refresh price/desc/image on existing
 *
 * Idempotent: products are matched by name, media by filename.
 */
import { getPayload } from 'payload'
import fs from 'fs'
import os from 'os'
import path from 'path'
import configPromise from '../payload.config'
import { GIFT_SETS, keyOf, type GiftSet } from './gift-sets-data'

const IMAGES_DIR =
  process.env.GIFT_SETS_IMAGES_DIR || path.join(os.homedir(), 'Downloads', 'Gift Sets 2026 Images')

const CATEGORY_SLUG = 'executive-sets'

/** Selling price, ex-GST: supplier catalogue price x 1.4 (per Anand, 2026-09-12). */
const MARKUP = 1.4
const sellingPrice = (g: GiftSet) => Math.round(g.price * MARKUP)

const DRY = process.argv.includes('--dry')
const UPDATE = process.argv.includes('--update')

async function run() {
  // fail fast on data problems before touching the database
  const names = new Set<string>()
  for (const g of GIFT_SETS) {
    if (names.has(g.name)) throw new Error(`Duplicate product name: ${g.name}`)
    names.add(g.name)
  }
  const missing = GIFT_SETS.filter((g) => !fs.existsSync(path.join(IMAGES_DIR, `${keyOf(g)}.jpg`)))
  if (missing.length) {
    throw new Error(
      `Missing ${missing.length} image(s) in ${IMAGES_DIR}: ${missing.map(keyOf).join(', ')}\n` +
        `Run: npm run build-gift-set-images`,
    )
  }

  const payload = await getPayload({ config: configPromise })
  console.log(`\n🎁 Importing ${GIFT_SETS.length} gift sets${DRY ? ' (DRY RUN)' : ''}\n`)

  const cat = await payload.find({
    collection: 'categories',
    where: { slug: { equals: CATEGORY_SLUG } },
  })
  if (!cat.docs.length) throw new Error(`Category not found: ${CATEGORY_SLUG}`)
  const categoryId = cat.docs[0].id as number
  const existingInCat = await payload.count({
    collection: 'products',
    where: { category: { equals: categoryId } },
  })
  console.log(
    `  📂 Category: ${(cat.docs[0] as unknown as { name: string }).name} (id ${categoryId}, ${existingInCat.totalDocs} existing products)\n`,
  )

  async function getOrUploadImage(g: GiftSet): Promise<number | null> {
    const filename = `giftset-${keyOf(g)}.jpg`
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
    })
    if (existing.docs.length) return existing.docs[0].id as number
    if (DRY) return null
    const buffer = fs.readFileSync(path.join(IMAGES_DIR, `${keyOf(g)}.jpg`))
    const media = await payload.create({
      collection: 'media',
      data: { alt: `${g.name} - corporate gift set` },
      file: { data: buffer, mimetype: 'image/jpeg', name: filename, size: buffer.length },
    })
    return media.id as number
  }

  let created = 0
  let updated = 0
  let skipped = 0

  for (let i = 0; i < GIFT_SETS.length; i++) {
    const g = GIFT_SETS[i]
    const price = sellingPrice(g)
    const existing = await payload.find({
      collection: 'products',
      where: { name: { equals: g.name } },
    })
    const data = {
      name: g.name,
      category: categoryId,
      price,
      description: g.desc,
      features: g.items.map((feature) => ({ feature })),
      moq: 10,
      customisable: true,
      inStock: true,
      order: existingInCat.totalDocs + i + 1,
    }

    if (existing.docs.length) {
      if (!UPDATE) {
        console.log(`  ⏭  Exists: ${g.code} ${g.name}`)
        skipped++
        continue
      }
      if (!DRY) {
        const imageId = await getOrUploadImage(g)
        await payload.update({
          collection: 'products',
          id: existing.docs[0].id as number,
          data: { ...data, ...(imageId ? { image: imageId } : {}) },
        })
      }
      console.log(`  🔄 Updated: ${g.code} ₹${price} ${g.name}`)
      updated++
      continue
    }

    if (DRY) {
      console.log(`  ➕ Would create: ${keyOf(g)} ₹${g.price}->₹${price} ${g.name}`)
      created++
      continue
    }
    const imageId = await getOrUploadImage(g)
    await payload.create({
      collection: 'products',
      data: { ...data, ...(imageId ? { image: imageId } : {}) },
    })
    console.log(`  ✅ Created: ${g.code} ₹${price} ${g.name}`)
    created++
  }

  console.log(`\n🎉 Done. Created ${created}, updated ${updated}, skipped ${skipped}.`)
  process.exit(0)
}

run().catch((err) => {
  console.error('Failed:', err)
  process.exit(1)
})
