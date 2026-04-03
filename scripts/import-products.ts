import { getPayload } from 'payload'
import configPromise from '../payload.config'

// Products from Google Sheet import
const importData = [
  {
    name: 'Temperature Display Bottle',
    categorySlug: 'bottles',
    price: 150,
    emoji: '🌡️',
    description: 'Temperature display water bottle by J Star. Capacity: 500 ml. Available in Black, White, Red, Pink and Blue.',
    features: [
      { feature: '500ml capacity' },
      { feature: 'Temperature display' },
      { feature: 'Available in 5 colours: Black, White, Red, Pink, Blue' },
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    order: 3,
  },
  {
    name: 'BOX UV PRINTED COASTER',
    categorySlug: 'home-living',
    price: 42,
    emoji: '🪵',
    description: 'UV printed cork coaster by 9Cork. Product code: 9C-CO13. 100 MM × 5 MM.',
    features: [
      { feature: '100mm × 5mm dimensions' },
      { feature: 'UV printed finish' },
      { feature: 'Cork material' },
      { feature: 'Product code: 9C-CO13' },
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    order: 3,
  },
  {
    name: 'Non Display Temperature Bottle',
    categorySlug: 'bottles',
    price: 150,
    emoji: '🍶',
    description: 'Non-display temperature water bottle by J Star. Capacity: 500 ml. Available in Black, White and Red.',
    features: [
      { feature: '500ml capacity' },
      { feature: 'Temperature retention' },
      { feature: 'Available in 3 colours: Black, White, Red' },
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    order: 4,
  },
  {
    name: 'Stainless Steel Water Bottle',
    categorySlug: 'bottles',
    price: 170,
    emoji: '🥤',
    description: 'Stainless steel water bottle by J Star. Capacity: 750 ml. Available in Black.',
    features: [
      { feature: '750ml capacity' },
      { feature: 'Stainless steel construction' },
      { feature: 'Available in Black' },
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    order: 5,
  },
  {
    name: 'Stainless Steel Sipper Bottle',
    categorySlug: 'bottles',
    price: 170,
    emoji: '🧴',
    description: 'Stainless steel sipper bottle by J Star. Capacity: 750 ml. Available in Black, Blue and Red.',
    features: [
      { feature: '750ml capacity' },
      { feature: 'Sipper lid design' },
      { feature: 'Stainless steel construction' },
      { feature: 'Available in 3 colours: Black, Blue, Red' },
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    order: 6,
  },
  {
    name: 'Aluminum Bottle With Clip',
    categorySlug: 'bottles',
    price: 114,
    emoji: '🔗',
    description: 'Aluminum bottle with clip by J Star. Capacity: 750 ml. Available in White, Black, Red and Blue.',
    features: [
      { feature: '750ml capacity' },
      { feature: 'Aluminum construction' },
      { feature: 'Carabiner clip for easy carry' },
      { feature: 'Available in 4 colours: White, Black, Red, Blue' },
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    order: 7,
  },
  {
    name: 'SS Double Wall Sports Water Bottle',
    categorySlug: 'bottles',
    price: 180,
    emoji: '🏃',
    description: 'Stainless steel double wall sports water bottle by J Star. Capacity: 550 ml. Available in Black, White, Blue and Silver.',
    features: [
      { feature: '550ml capacity' },
      { feature: 'Double wall insulation' },
      { feature: 'Stainless steel construction' },
      { feature: 'Available in 4 colours: Black, White, Blue, Silver' },
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    order: 8,
  },
  {
    name: 'SS Single Wall Water Bottle',
    categorySlug: 'bottles',
    price: 150,
    emoji: '💧',
    description: 'Stainless steel single wall water bottle by J Star. Capacity: 750 ml. Available in Black, Blue and Silver.',
    features: [
      { feature: '750ml capacity' },
      { feature: 'Single wall stainless steel' },
      { feature: 'Available in 3 colours: Black, Blue, Silver' },
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    order: 9,
  },
  {
    name: 'SS Bottle Double Wall',
    categorySlug: 'bottles',
    price: 280,
    emoji: '🫙',
    description: 'Stainless steel double wall bottle by J Star. Capacity: 500 ml. Available in White.',
    features: [
      { feature: '500ml capacity' },
      { feature: 'Double wall insulation' },
      { feature: 'Premium stainless steel' },
      { feature: 'Available in White' },
    ],
    moq: 10,
    customisable: true,
    inStock: true,
    order: 10,
  },
]

async function importProducts() {
  const payload = await getPayload({ config: configPromise })

  console.log('📥 Importing products from Google Sheet...\n')

  // Resolve all required category slugs
  const requiredSlugs = [...new Set(importData.map((p) => p.categorySlug))]
  const categoryMap: Record<string, number> = {}

  for (const slug of requiredSlugs) {
    const result = await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
    })
    if (result.docs.length === 0) {
      console.error(`  ❌ Category not found: ${slug}`)
      process.exit(1)
    }
    categoryMap[slug] = result.docs[0].id as number
    console.log(`  📂 Found category: ${result.docs[0].name} (id: ${categoryMap[slug]})`)
  }

  console.log('')

  let created = 0
  let skipped = 0

  for (const product of importData) {
    const { categorySlug, ...productData } = product

    const existing = await payload.find({
      collection: 'products',
      where: { name: { equals: product.name } },
    })

    if (existing.docs.length > 0) {
      console.log(`  ⏭  Already exists: ${product.name}`)
      skipped++
      continue
    }

    await payload.create({
      collection: 'products',
      data: {
        ...productData,
        category: categoryMap[categorySlug],
      },
    })
    console.log(`  ✅ Created: ${product.name}`)
    created++
  }

  console.log(`\n🎉 Import complete! Created: ${created}, Skipped: ${skipped}`)
  process.exit(0)
}

importProducts().catch((err) => {
  console.error('Import failed:', err)
  process.exit(1)
})
