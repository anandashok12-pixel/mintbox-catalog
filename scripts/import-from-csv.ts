import { getPayload } from 'payload'
import configPromise from '../payload.config'
import fs from 'fs'
import path from 'path'

const CSV_PATH = '/Users/anandashok/Downloads/MintBox - Sheet8.csv'
const IMAGES_DIR = '/Users/anandashok/Downloads/Mintbox Product Images'

// Simple CSV parser that handles quoted fields
function parseCSV(content: string): string[][] {
  const rows: string[][] = []
  const lines = content.split('\n').filter((l) => l.trim())
  for (const line of lines) {
    const fields: string[] = []
    let current = ''
    let inQuotes = false
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === '"') {
        inQuotes = !inQuotes
      } else if (ch === ',' && !inQuotes) {
        fields.push(current.trim())
        current = ''
      } else {
        current += ch
      }
    }
    fields.push(current.trim())
    rows.push(fields)
  }
  return rows
}

// Find image file for a product (case-insensitive exact match)
function findImage(productName: string): string | null {
  const files = fs.readdirSync(IMAGES_DIR)
  const target = `${productName}.png`.toLowerCase()
  const match = files.find((f) => f.toLowerCase() === target)
  return match ? path.join(IMAGES_DIR, match) : null
}

// Slugify a category name
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function run() {
  const payload = await getPayload({ config: configPromise })

  console.log('📥 Importing products from CSV with images...\n')

  // Parse CSV
  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8')
  const rows = parseCSV(csvContent)
  const headers = rows[0] // Sl No, Product, Category, Price, Product Description
  const dataRows = rows.slice(1)

  console.log(`📋 Found ${dataRows.length} products in CSV\n`)

  // --- Step 1: ensure all categories exist ---
  const categoryNames = [...new Set(dataRows.map((r) => r[2]).filter(Boolean))]
  const categoryMap: Record<string, number> = {}

  console.log('🗂️  Ensuring categories exist...')
  for (const name of categoryNames) {
    const slug = slugify(name)
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
    })
    if (existing.docs.length > 0) {
      categoryMap[name] = existing.docs[0].id as number
      console.log(`  ⏭  Category exists: ${name}`)
    } else {
      const created = await payload.create({
        collection: 'categories',
        data: { name, slug, order: 0 },
      })
      categoryMap[name] = created.id as number
      console.log(`  ✅ Created category: ${name}`)
    }
  }

  // --- Step 2: upload image once per unique filename, reuse media IDs ---
  const mediaCache: Record<string, number> = {}

  async function getOrUploadImage(productName: string): Promise<number | null> {
    if (mediaCache[productName]) return mediaCache[productName]

    const imagePath = findImage(productName)
    if (!imagePath) {
      console.log(`  ⚠️  No image found for: ${productName}`)
      return null
    }

    const buffer = fs.readFileSync(imagePath)
    const filename = path.basename(imagePath)

    // Check if already uploaded to media by filename
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
    })
    if (existing.docs.length > 0) {
      mediaCache[productName] = existing.docs[0].id as number
      return mediaCache[productName]
    }

    const media = await payload.create({
      collection: 'media',
      data: { alt: productName },
      file: {
        data: buffer,
        mimetype: 'image/png',
        name: filename,
        size: buffer.length,
      },
    })
    mediaCache[productName] = media.id as number
    return mediaCache[productName]
  }

  // --- Step 3: create / update products ---
  console.log('\n📦 Processing products...')
  let created = 0
  let updated = 0
  let skipped = 0

  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i]
    const [, name, categoryName, priceStr, description] = row
    if (!name) continue

    const price = parseFloat(priceStr) || 0
    const categoryId = categoryMap[categoryName]

    // Upload image
    const imageId = await getOrUploadImage(name)

    // Check if product already exists
    const existing = await payload.find({
      collection: 'products',
      where: { name: { equals: name } },
    })

    if (existing.docs.length > 0) {
      const doc = existing.docs[0]
      // Update if missing image or description
      if (!doc.image || !doc.description) {
        await payload.update({
          collection: 'products',
          id: doc.id,
          data: {
            ...(imageId && !doc.image ? { image: imageId } : {}),
            ...(description && !doc.description ? { description } : {}),
          },
        })
        console.log(`  🔄 Updated: ${name}`)
        updated++
      } else {
        console.log(`  ⏭  Skipped (complete): ${name}`)
        skipped++
      }
      continue
    }

    // Create new product
    await payload.create({
      collection: 'products',
      data: {
        name,
        category: categoryId,
        price,
        description: description || name,
        ...(imageId ? { image: imageId } : {}),
        customisable: true,
        inStock: true,
        moq: 10,
        order: i + 1,
      },
    })
    console.log(`  ✅ Created: ${name}${imageId ? ' 🖼️' : ' (no image)'}`)
    created++
  }

  console.log(`\n🎉 Done! Created: ${created}, Updated: ${updated}, Skipped: ${skipped}`)
  process.exit(0)
}

run().catch((err) => {
  console.error('Import failed:', err)
  process.exit(1)
})
