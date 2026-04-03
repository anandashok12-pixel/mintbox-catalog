import { getPayload } from 'payload'
import configPromise from '../payload.config'
import fs from 'fs'
import path from 'path'

const PRODUCT_NAME = 'USB-C Hub 5-in-1'

// Pass the image path as a CLI argument: npm run set-usbc-hub-image -- /path/to/image.jpg
const imagePath = process.argv[2]

async function setProductImage() {
  if (!imagePath) {
    console.error('❌ Usage: npm run set-usbc-hub-image -- /path/to/image.jpg')
    process.exit(1)
  }

  const resolvedPath = path.resolve(imagePath)
  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌ File not found: ${resolvedPath}`)
    process.exit(1)
  }

  const buffer = fs.readFileSync(resolvedPath)
  const filename = path.basename(resolvedPath)
  const ext = path.extname(filename).toLowerCase()
  const mimeMap: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
  }
  const mimeType = mimeMap[ext] || 'image/jpeg'

  console.log(`📷 Setting hero image for "${PRODUCT_NAME}"`)
  console.log(`   File: ${filename} (${mimeType}, ${(buffer.length / 1024).toFixed(1)} KB)\n`)

  const payload = await getPayload({ config: configPromise })

  // Find the product
  const result = await payload.find({
    collection: 'products',
    where: { name: { equals: PRODUCT_NAME } },
  })

  if (result.docs.length === 0) {
    console.error(`❌ Product not found: "${PRODUCT_NAME}"`)
    process.exit(1)
  }

  const product = result.docs[0]
  console.log(`✅ Found product (id: ${product.id})`)

  // Upload image to media collection
  console.log('📤 Uploading image to media collection...')
  const mediaDoc = await payload.create({
    collection: 'media',
    data: { alt: `${PRODUCT_NAME} hero image` },
    file: {
      data: buffer,
      mimetype: mimeType,
      name: filename,
      size: buffer.length,
    },
  })
  console.log(`✅ Media uploaded (id: ${mediaDoc.id})`)

  // Attach to product
  await payload.update({
    collection: 'products',
    id: product.id as number,
    data: { image: mediaDoc.id as number },
  })

  console.log(`\n🎉 Done! "${PRODUCT_NAME}" hero image updated.`)
  process.exit(0)
}

setProductImage().catch((err) => {
  console.error('Failed:', err)
  process.exit(1)
})
