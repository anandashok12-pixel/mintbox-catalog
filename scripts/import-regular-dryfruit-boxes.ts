/**
 * Import 15 "Regular Dry Fruit Box" combos (RB01-RB16, excl. RB03 which
 * duplicates DK01) priced from Havenuts' "reseller price list.pdf"
 * (REGULAR DRYFRUIT BOX 1-16, NET PRICE column), into the existing
 * "Diwali Gift Boxes" category (slug diwali-gift-boxes) alongside DK01-DK55.
 *
 * Images are composited product cards (box/lid cutout photos + ingredient
 * icons, from a design canvas artifact) rendered to 1254x1254 PNG and saved
 * as RB0N.png in IMAGES_DIR.
 *
 * Usage:
 *   npm run import-regular-dryfruit-boxes            # create products in existing category
 *   npm run import-regular-dryfruit-boxes -- --dry   # print what would happen, no writes
 *   npm run import-regular-dryfruit-boxes -- --update  # also update price/desc/image on existing
 *
 * Idempotent: products are matched by name; categories by slug; media by filename.
 */
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import fs from 'fs'
import path from 'path'

const IMAGES_DIR =
  process.env.RB_IMAGES_DIR || '/Users/anandashok/Downloads/Regular Dry Fruit Box Images'

const CATEGORY_SLUG = 'diwali-gift-boxes'

type Box = { code: string; price: number; name: string; desc: string; items: string[] }

// price = MintBox selling price per unit, ex-GST (reseller NET PRICE x 1.4, per Anand 2026-09-26)
const BOXES: Box[] = [
  { code: 'RB01', price: 280, name: 'Dry Fruits 4-in-1 Combo Box (40g each) - Patterned Sleeve',
    desc: 'Four-compartment gift box with 40g each of cashew, almond, raisins and apricot, in a patterned-sleeve presentation box. A neat, festive dry-fruit gift for Diwali.',
    items: ['Cashew 40g', 'Almond 40g', 'Raisins 40g', 'Apricot 40g'] },
  { code: 'RB02', price: 392, name: 'Dry Fruits 4-in-1 Combo Box (50g each) - Teal Palm-Leaf Lid',
    desc: 'Four-compartment gift box with 50g each of cashew, almond, raisins and apricot, in a teal palm-leaf lid box.',
    items: ['Cashew 50g', 'Almond 50g', 'Raisins 50g', 'Apricot 50g'] },
  // RB03 skipped: duplicates DK01 (Dry Fruits 4-in-1 Combo Box, 50g each - same ingredients & price)
  { code: 'RB04', price: 532, name: 'Dry Fruits 6-in-1 Combo Box (50g each) - Peach Floral Sleeve',
    desc: 'Six-compartment gift box with 50g each of cashew, dates, almond, apricot, raisins and chocolates, in a peach floral-sleeve box.',
    items: ['Cashew 50g', 'Dates 50g', 'Almond 50g', 'Apricot 50g', 'Raisins 50g', 'Chocolates 50g'] },
  { code: 'RB05', price: 616, name: 'Dry Fruits 6-in-1 Combo Box (50g each) - Red Lid, Gold Tag',
    desc: 'Six-compartment gift box with 50g each of cashew, pistachio, almond, apricot, raisins and chocolates, in a red box with a gold tag.',
    items: ['Cashew 50g', 'Pistachio 50g', 'Almond 50g', 'Apricot 50g', 'Raisins 50g', 'Chocolates 50g'] },
  { code: 'RB06', price: 616, name: 'Dry Fruits 4-in-1 Combo Box (75g each) - Teal Palm-Leaf Lid',
    desc: 'Four-compartment gift box with 75g each of cashew, almond, raisins and chocolates, in a teal palm-leaf lid box.',
    items: ['Cashew 75g', 'Almond 75g', 'Raisins 75g', 'Chocolates 75g'] },
  { code: 'RB07', price: 839, name: 'Dry Fruits 4-in-1 Combo Box (100g each) - Red Woven Lid',
    desc: 'Four-compartment gift box with 100g each of cashew, almond, raisins and pistachio, in a red woven-lid box.',
    items: ['Cashew 100g', 'Almond 100g', 'Raisins 100g', 'Pistachio 100g'] },
  { code: 'RB08', price: 816, name: 'Dry Fruits 6-in-1 Combo Box (75g each) - Teal Palm-Leaf Lid',
    desc: 'Six-compartment gift box with 75g each of cashew, dates, almond, apricot, raisins and chocolates, in a teal palm-leaf lid box.',
    items: ['Cashew 75g', 'Dates 75g', 'Almond 75g', 'Apricot 75g', 'Raisins 75g', 'Chocolates 75g'] },
  { code: 'RB09', price: 951, name: 'Dry Fruits 6-in-1 Combo Box (75g each) - Peach Floral Sleeve',
    desc: 'Six-compartment gift box with 75g each of cashew, pistachio, almond, apricot, raisins and chocolates, in a peach floral-sleeve box.',
    items: ['Cashew 75g', 'Pistachio 75g', 'Almond 75g', 'Apricot 75g', 'Raisins 75g', 'Chocolates 75g'] },
  { code: 'RB10', price: 1119, name: 'Dry Fruits 6-in-1 Combo Box (100g each) - Red Lid, Gold Tag',
    desc: 'Six-compartment gift box with 100g each of cashew, pistachio, almond, apricot, raisins and chocolates, in a red box with a gold tag.',
    items: ['Cashew 100g', 'Pistachio 100g', 'Almond 100g', 'Apricot 100g', 'Raisins 100g', 'Chocolates 100g'] },
  { code: 'RB11', price: 1231, name: 'Dry Fruits 4-in-1 Combo Box (150g each) - Peach Feather Sleeve',
    desc: 'Four-compartment gift box with 150g each of cashew, almond, raisins and pistachio, in a peach feather-sleeve box.',
    items: ['Cashew 150g', 'Almond 150g', 'Raisins 150g', 'Pistachio 150g'] },
  { code: 'RB12', price: 1567, name: 'Dry Fruits 4-in-1 Combo Box (200g each) - Beige Feather Band',
    desc: 'Four-compartment gift box with 200g each of cashew, almond, raisins and pistachio, in a beige feather-band box.',
    items: ['Cashew 200g', 'Almond 200g', 'Raisins 200g', 'Pistachio 200g'] },
  { code: 'RB13', price: 1567, name: 'Dry Fruits 6-in-1 Combo Box (150g each) - Elephant-Art Lid',
    desc: 'Six-compartment gift box with 150g each of cashew, pistachio, almond, apricot, raisins and chocolates, in a hand-painted elephant-art lid box.',
    items: ['Cashew 150g', 'Pistachio 150g', 'Almond 150g', 'Apricot 150g', 'Raisins 150g', 'Chocolates 150g'] },
  { code: 'RB14', price: 2015, name: 'Dry Fruits 6-in-1 Combo Box (200g each) - Red Lid, Gold Tag',
    desc: 'Six-compartment gift box with 200g each of cashew, pistachio, almond, apricot, raisins and chocolates, in a red box with a gold tag.',
    items: ['Cashew 200g', 'Pistachio 200g', 'Almond 200g', 'Apricot 200g', 'Raisins 200g', 'Chocolates 200g'] },
  { code: 'RB15', price: 1063, name: 'Dry Fruits 4-in-1 Combo Box (100g each) - Engraved Silver-Gold Box',
    desc: 'Four-compartment gift box with 100g each of cashew, almond, raisins and pistachio, in an engraved silver-and-gold box.',
    items: ['Cashew 100g', 'Almond 100g', 'Raisins 100g', 'Pistachio 100g'] },
  { code: 'RB16', price: 1679, name: 'Dry Fruits 4-in-1 Combo Box (150g each) - Engraved Wooden Chest',
    desc: 'Four-compartment gift box with 150g each of cashew, almond, raisins and pistachio, in an engraved wooden chest.',
    items: ['Cashew 150g', 'Almond 150g', 'Raisins 150g', 'Pistachio 150g'] },
]

const DRY = process.argv.includes('--dry')
const UPDATE = process.argv.includes('--update')

async function run() {
  if (BOXES.length !== 15) throw new Error(`Expected 15 boxes (RB03 skipped), got ${BOXES.length}`)
  const missing = BOXES.filter((b) => !fs.existsSync(path.join(IMAGES_DIR, `${b.code}.png`)))
  if (missing.length) throw new Error(`Missing images: ${missing.map((b) => b.code).join(', ')}`)

  const payload = await getPayload({ config: configPromise })
  console.log(`\n🥜 Importing ${BOXES.length} Regular Dry Fruit Boxes into "${CATEGORY_SLUG}"${DRY ? ' (DRY RUN)' : ''}\n`)

  // --- category (must already exist) ---
  let categoryId: number
  let existingInCatCount = 0
  const existingCat = await payload.find({ collection: 'categories', where: { slug: { equals: CATEGORY_SLUG } } })
  if (existingCat.docs.length) {
    categoryId = existingCat.docs[0].id as number
    const inCat = await payload.find({ collection: 'products', where: { category: { equals: categoryId } }, limit: 0 })
    existingInCatCount = inCat.totalDocs
    console.log(`  ⏭  Category exists: ${CATEGORY_SLUG} (id ${categoryId}, ${existingInCatCount} products already in it)`)
  } else if (DRY) {
    categoryId = -1
    console.log(`  ⚠️  Category "${CATEGORY_SLUG}" not found (would fail on a real run)`)
  } else {
    throw new Error(`Category "${CATEGORY_SLUG}" does not exist - expected it to already exist`)
  }

  // --- media ---
  async function getOrUploadImage(box: Box): Promise<number | null> {
    const filename = `regular-dryfruit-${box.code.toLowerCase()}.png`
    const existing = await payload.find({ collection: 'media', where: { filename: { equals: filename } } })
    if (existing.docs.length) return existing.docs[0].id as number
    if (DRY) return null
    const buffer = fs.readFileSync(path.join(IMAGES_DIR, `${box.code}.png`))
    const media = await payload.create({
      collection: 'media',
      data: { alt: `${box.name} - Diwali dry fruit gift box` },
      file: { data: buffer, mimetype: 'image/png', name: filename, size: buffer.length },
    })
    return media.id as number
  }

  // --- products ---
  let created = 0, updated = 0, skipped = 0
  for (let i = 0; i < BOXES.length; i++) {
    const box = BOXES[i]
    const existing = await payload.find({ collection: 'products', where: { name: { equals: box.name } } })
    const data = {
      name: box.name,
      category: categoryId,
      price: box.price,
      description: box.desc,
      features: box.items.map((feature) => ({ feature })),
      moq: 10,
      customisable: true,
      inStock: true,
      order: existingInCatCount + i + 1,
    }
    if (existing.docs.length) {
      if (!UPDATE) { console.log(`  ⏭  Exists: ${box.code} ${box.name}`); skipped++; continue }
      if (!DRY) {
        const imageId = await getOrUploadImage(box)
        await payload.update({ collection: 'products', id: existing.docs[0].id as number, data: { ...data, ...(imageId ? { image: imageId } : {}) } })
      }
      console.log(`  🔄 Updated: ${box.code} ${box.name}`); updated++; continue
    }
    if (DRY) { console.log(`  ➕ Would create: ${box.code} ₹${box.price} ${box.name}`); created++; continue }
    const imageId = await getOrUploadImage(box)
    await payload.create({ collection: 'products', data: { ...data, ...(imageId ? { image: imageId } : {}) } })
    console.log(`  ✅ Created: ${box.code} ₹${box.price} ${box.name}`); created++
  }

  console.log(`\n🎉 Done. Created ${created}, updated ${updated}, skipped ${skipped}.`)
  process.exit(0)
}

run().catch((err) => { console.error('Failed:', err); process.exit(1) })
