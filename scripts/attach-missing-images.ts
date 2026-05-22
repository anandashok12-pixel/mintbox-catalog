import { getPayload } from 'payload'
import configPromise from '../payload.config'
import fs from 'fs'
import path from 'path'

const MAPPINGS: { productId: number; productName: string; file: string }[] = [
  // Batch 1 — already attached
  { productId: 251, productName: 'Brass Coffee Cup', file: '/Users/anandashok/Downloads/Brass coffee cup.png' },
  { productId: 408, productName: 'Ferrero Rocher Dark Chocolate Bar with Hazelnut – 90g', file: '/Users/anandashok/Downloads/Ferrero Rocher Dark Chocolate Bar with Hazelnut – 90g.png' },
  { productId: 129, productName: 'GEO Inspire 8W Portable Bluetooth Speaker', file: '/Users/anandashok/Downloads/GEO Inspire 8W Portable Bluetooth Speaker.png' },
  { productId: 359, productName: 'Coffee & Tea maker', file: '/Users/anandashok/Downloads/Coffee & Tea maker (Frenchpress).jpeg' },
  { productId: 400, productName: 'Sancha Butterfly Pea Flower Tea (25 Bags)', file: '/Users/anandashok/Downloads/Sancha Butterfly Pea Flower Tea (25 Bags).jpeg' },
  // Batch 2 — new
  { productId: 373, productName: '4700BC Tiramisu Chocolate Popcorn Tin – 135g', file: '/Users/anandashok/Downloads/4700BC Tiramisu Chocolate Popcorn Tin – 135g.jpeg' },
  { productId: 386, productName: 'Awe Foods Sourdough Cheese Crackers – 150g', file: '/Users/anandashok/Downloads/Awe Foods Sourdough Cheese Crackers – 150g.jpeg' },
  { productId: 357, productName: 'Coffee Mug', file: '/Users/anandashok/Downloads/Coffee Mug.jpeg' },
  { productId: 365, productName: 'Coffee Mug for Travel', file: '/Users/anandashok/Downloads/Coffee Mug for Travel.jpeg' },
  { productId: 192, productName: 'Premium Vegan Leather Executive Desk Set of 6', file: '/Users/anandashok/Downloads/Premium Vegan Leather Executive Desk Set of 6.jpeg' },
  { productId: 437, productName: 'SAKI Bartender kit', file: '/Users/anandashok/Downloads/SAKI|10 Piece Bartender kit (Cocktail Shaker Gift Set with Gray Stand) (just imported).jpeg' },
  { productId: 421, productName: "Shim's Gourmet Crunchy Cassava Chips", file: "/Users/anandashok/Downloads/Shim's Gourmet | Crunchy Cassava Chips | Assorted Flavours Combo.jpeg" },
]

function mimeOf(file: string): string {
  const ext = path.extname(file).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg'
  if (ext === '.webp') return 'image/webp'
  throw new Error(`Unknown extension for ${file}`)
}

async function run() {
  const payload = await getPayload({ config: configPromise })

  for (const m of MAPPINGS) {
    if (!fs.existsSync(m.file)) {
      console.log(`  ⚠️  [${m.productId}] Missing file: ${m.file}`)
      continue
    }

    // Confirm the product exists and currently has no image
    const product = await payload.findByID({ collection: 'products', id: m.productId, depth: 0 })
    if (!product) {
      console.log(`  ⚠️  [${m.productId}] Product not found in DB`)
      continue
    }
    if (product.image) {
      console.log(`  ⏭  [${m.productId}] ${product.name} already has an image — skipping`)
      continue
    }
    if (product.name !== m.productName) {
      console.log(`  ⚠️  [${m.productId}] Name mismatch: DB="${product.name}" vs script="${m.productName}". Proceeding anyway.`)
    }

    // Upload media
    const buffer = fs.readFileSync(m.file)
    const filename = path.basename(m.file)
    const media = await payload.create({
      collection: 'media',
      data: { alt: m.productName },
      file: { data: buffer, mimetype: mimeOf(m.file), name: filename, size: buffer.length },
    })

    await payload.update({
      collection: 'products',
      id: m.productId,
      data: { image: media.id as number },
    })

    console.log(`  ✅ [${m.productId}] ${product.name}  ←  ${filename} (${(buffer.length / 1024).toFixed(0)} KB)`)
  }

  process.exit(0)
}

run().catch((e) => {
  console.error('Failed:', e)
  process.exit(1)
})
