import { getPayload } from 'payload'
import configPromise from '../payload.config'

const DRIVE_FILE_ID = '1S57z7X8CuuWUsd5zv2kATo0AmaV2jATD'
const DRIVE_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`

// The 9 products imported from the Google Sheet
const PRODUCT_NAMES = [
  'Temperature Display Bottle',
  'BOX UV PRINTED COASTER',
  'Non Display Temperature Bottle',
  'Stainless Steel Water Bottle',
  'Stainless Steel Sipper Bottle',
  'Aluminum Bottle With Clip',
  'SS Double Wall Sports Water Bottle',
  'SS Single Wall Water Bottle',
  'SS Bottle Double Wall',
]

async function downloadDriveFile(): Promise<{ buffer: Buffer; mimeType: string; filename: string }> {
  console.log('  ⬇️  Downloading from Google Drive...')
  const res = await fetch(DRIVE_DOWNLOAD_URL)
  if (!res.ok) throw new Error(`Failed to download: ${res.status} ${res.statusText}`)

  const mimeType = res.headers.get('content-type') || 'image/jpeg'
  const disposition = res.headers.get('content-disposition') || ''
  const filenameMatch = disposition.match(/filename\*?=(?:UTF-8'')?["']?([^"';\n]+)["']?/i)
  const filename = filenameMatch ? decodeURIComponent(filenameMatch[1].trim()) : `product-image.jpg`

  const arrayBuffer = await res.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  console.log(`  📄 Downloaded: ${filename} (${mimeType}, ${(buffer.length / 1024).toFixed(1)} KB)`)
  return { buffer, mimeType, filename }
}

async function attachImages() {
  const payload = await getPayload({ config: configPromise })

  console.log('🖼️  Attaching images to imported products...\n')

  // Download the file
  const { buffer, mimeType, filename } = await downloadDriveFile()

  if (!mimeType.startsWith('image/')) {
    console.error(`  ❌ File is not an image (got: ${mimeType}). Media collection only accepts images.`)
    process.exit(1)
  }

  // Upload to media collection once
  console.log('  📤 Uploading to Payload media collection...')
  const mediaDoc = await payload.create({
    collection: 'media',
    data: { alt: 'J Star product catalogue image' },
    file: {
      data: buffer,
      mimetype: mimeType,
      name: filename,
      size: buffer.length,
    },
  })
  console.log(`  ✅ Media created (id: ${mediaDoc.id})\n`)

  // Update each product
  let updated = 0
  let skipped = 0

  for (const name of PRODUCT_NAMES) {
    const result = await payload.find({
      collection: 'products',
      where: { name: { equals: name } },
    })

    if (result.docs.length === 0) {
      console.log(`  ⚠️  Product not found: ${name}`)
      skipped++
      continue
    }

    const product = result.docs[0]

    if (product.image) {
      console.log(`  ⏭  Already has image: ${name}`)
      skipped++
      continue
    }

    await payload.update({
      collection: 'products',
      id: product.id as number,
      data: { image: mediaDoc.id as number },
    })
    console.log(`  ✅ Updated: ${name}`)
    updated++
  }

  console.log(`\n🎉 Done! Updated: ${updated}, Skipped: ${skipped}`)
  process.exit(0)
}

attachImages().catch((err) => {
  console.error('Failed:', err)
  process.exit(1)
})
