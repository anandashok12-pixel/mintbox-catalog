import { getPayload } from 'payload'
import configPromise from '../payload.config'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const IMAGES_DIR = '/Users/anandashok/Downloads/Corporate Catalog Product Images'
const XLSX = '/Users/anandashok/Downloads/corporate brochure-2.xlsx'

// Manual overrides for non-obvious matches and skips
const IMAGE_OVERRIDES: Record<number, string | null> = {
  226: 'Traditional 1 Brass Coffee Filter (200ml) and 2 Dabra [Cups and Saucers] set.png',
  238: null, // no image in folder
  251: 'ella Vita Luxury CEO MAN Perfume.png',
}

// Category assignment per Sl No
const CATEGORY_SLUGS: Record<number, string> = {
  224: 'tea-coffee', 225: 'tea-coffee', 226: 'tea-coffee', 227: 'tea-coffee',
  228: 'home-living', 229: 'home-living', 230: 'home-living', 231: 'home-living',
  232: 'home-living', 233: 'home-living', 234: 'home-living', 235: 'home-living',
  236: 'home-living', 237: 'home-living', 238: 'home-living',
  239: 'diaries', 240: 'diaries', 241: 'diaries', 242: 'diaries', 243: 'diaries',
  244: 'diaries', 245: 'diaries',
  246: 'executive-sets', 247: 'executive-sets',
  248: 'diaries', 249: 'diaries',
  250: 'home-living', 251: 'home-living', 252: 'home-living',
  253: 'executive-sets',
  254: 'pens-stationery', 255: 'pens-stationery',
  256: 'drinkware',
  257: 'pens-stationery', 258: 'pens-stationery', 259: 'pens-stationery',
  260: 'home-living',
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/\.(png|jpe?g|webp|gif)$/i, '')
    .replace(/[^a-z0-9]+/g, '')
    .trim()
}

function roundTo5(n: number): number {
  return Math.round(n / 5) * 5
}

type Row = { sl: number; name: string; price: number; desc: string }

function loadRows(): Row[] {
  const json = execSync(
    `python3 -c "
import pandas as pd, json
df = pd.read_excel('${XLSX}', sheet_name='Catalogue')
subset = df[(df['Sl No'] >= 224) & (df['Sl No'] <= 260)]
out = []
for _, row in subset.iterrows():
    out.append({
        'sl': int(row['Sl No']),
        'name': str(row['Product']).strip(),
        'price': float(row['Selling Price']) if pd.notna(row['Selling Price']) else 0,
        'desc': str(row['Product Description']).strip() if pd.notna(row['Product Description']) else str(row['Product']).strip(),
    })
print(json.dumps(out))
"`,
    { encoding: 'utf-8' },
  )
  return JSON.parse(json)
}

function findImageFile(sl: number, name: string, fileMap: Map<string, string>): string | null {
  if (sl in IMAGE_OVERRIDES) return IMAGE_OVERRIDES[sl]
  const key = normalize(name)
  const exact = fileMap.get(key)
  if (exact) return exact
  // Prefer filenames that are a prefix of the (longer) product name — common pattern
  // where the spreadsheet name has extra suffix detail vs the truncated filename.
  let best: { len: number; file: string } | null = null
  for (const [fk, fv] of fileMap.entries()) {
    if (fk.length >= 12 && key.startsWith(fk)) {
      if (!best || fk.length > best.len) best = { len: fk.length, file: fv }
    }
  }
  if (best) return best.file
  // Or vice versa: file name is longer but starts with the product name (rare)
  for (const [fk, fv] of fileMap.entries()) {
    if (key.length >= 12 && fk.startsWith(key)) return fv
  }
  return null
}

async function run() {
  const dryRun = process.argv.includes('--dry-run')
  const payload = await getPayload({ config: configPromise })

  console.log(`📥 Importing rows 224-260 from xlsx${dryRun ? ' (DRY RUN)' : ''}\n`)

  const rows = loadRows()
  console.log(`Loaded ${rows.length} rows\n`)

  // Build image file map
  const files = fs.readdirSync(IMAGES_DIR)
  const fileMap = new Map<string, string>()
  for (const f of files) fileMap.set(normalize(f), f)

  // Pre-load category IDs
  const catIds: Record<string, number> = {}
  const allSlugs = [...new Set(Object.values(CATEGORY_SLUGS))]
  for (const slug of allSlugs) {
    const r = await payload.find({ collection: 'categories', where: { slug: { equals: slug } } })
    if (r.docs.length === 0) throw new Error(`Category not found: ${slug}`)
    catIds[slug] = r.docs[0].id as number
  }
  console.log('Resolved categories:', catIds, '\n')

  // Get max existing order to start after
  const maxOrderResult = await payload.find({
    collection: 'products', sort: '-order', limit: 1, depth: 0,
  })
  const startOrder = (maxOrderResult.docs[0]?.order as number || 0) + 10
  console.log(`Starting order at: ${startOrder}\n`)

  let created = 0
  let skipped = 0
  let noImage = 0

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const slug = CATEGORY_SLUGS[row.sl]
    if (!slug) {
      console.log(`  ⚠️  No category mapping for ${row.sl}, skipping`)
      skipped++
      continue
    }
    const categoryId = catIds[slug]

    // Check duplicate
    const existing = await payload.find({
      collection: 'products', where: { name: { equals: row.name } }, limit: 1,
    })
    if (existing.docs.length > 0) {
      console.log(`  ⏭  [${row.sl}] Already exists: ${row.name.slice(0, 60)}`)
      skipped++
      continue
    }

    // Find image
    const imageFilename = findImageFile(row.sl, row.name, fileMap)
    let imageId: number | undefined = undefined

    if (imageFilename) {
      const imgPath = path.join(IMAGES_DIR, imageFilename)
      if (!fs.existsSync(imgPath)) {
        console.log(`  ⚠️  [${row.sl}] Image file missing on disk: ${imageFilename}`)
      } else {
        // Check if media already uploaded by filename
        const mediaExisting = await payload.find({
          collection: 'media', where: { filename: { equals: imageFilename } }, limit: 1,
        })
        if (mediaExisting.docs.length > 0) {
          imageId = mediaExisting.docs[0].id as number
        } else if (!dryRun) {
          const buffer = fs.readFileSync(imgPath)
          const media = await payload.create({
            collection: 'media',
            data: { alt: row.name },
            file: { data: buffer, mimetype: 'image/png', name: imageFilename, size: buffer.length },
          })
          imageId = media.id as number
        }
      }
    } else {
      noImage++
    }

    const price = roundTo5(row.price)
    const order = startOrder + i

    const data: any = {
      name: row.name,
      category: categoryId,
      price,
      description: row.desc,
      customisable: true,
      inStock: true,
      moq: 10,
      order,
    }
    if (imageId) data.image = imageId

    if (dryRun) {
      const mark = imageFilename ? '🖼️' : '❌'
      console.log(`  📋 [${row.sl}] ${mark} ${slug.padEnd(15)} ₹${String(price).padStart(5)} ${row.name.slice(0, 60)}\n           img: ${imageFilename || '(none)'}`)
    } else {
      await payload.create({ collection: 'products', data })
      console.log(`  ✅ [${row.sl}] ${imageId ? '🖼️' : '  '} ${slug.padEnd(15)} ₹${String(price).padStart(5)} ${row.name.slice(0, 70)}`)
      created++
    }
  }

  console.log(`\n🎉 Done. Created: ${created}, Skipped: ${skipped}, Without image: ${noImage}`)
  process.exit(0)
}

run().catch((e) => {
  console.error('Import failed:', e)
  process.exit(1)
})
