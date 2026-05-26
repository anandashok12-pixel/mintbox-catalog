import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import EcoFriendlyClient from '@/components/pages/EcoFriendlyClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Eco-Friendly Corporate Gifts: Sustainable Gifting 2026 | MintBox',
  description:
    'Sustainable corporate gifts - seed paper notebooks, bamboo pens, jute bags, and recycled kits. ESG-aligned gifting from ₹150/unit. Bangalore & Pan-India.',
  alternates: { canonical: 'https://themintbox.in/collections/eco-friendly-gifts' },
  openGraph: {
    title: 'Eco-Friendly Corporate Gifts: Sustainable Gifting 2026 | MintBox',
    description:
      'Sustainable corporate gifts - seed paper notebooks, bamboo pens, jute bags, and recycled kits. ESG-aligned gifting from ₹150/unit. Bangalore & Pan-India.',
  },
}

export const dynamic = 'force-dynamic'

export default async function EcoFriendlyPage() {
  let products: any[] = []
  let categories: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const [catsResult, productsResult] = await Promise.all([
      payload.find({ collection: 'categories', sort: 'order', limit: 100 }),
      payload.find({
        collection: 'products',
        where: { inStock: { equals: true } },
        sort: 'order',
        limit: 500,
        depth: 1,
      }),
    ])
    categories = catsResult.docs
    products = productsResult.docs
  } catch (err) {
    console.error('[eco-friendly-gifts] Payload query failed:', err)
  }

  // Filter to category-relevant products only
  const targetCat = categories.find((c: any) => {
    const text = ((c.slug || '') + ' ' + (c.name || '')).toLowerCase()
    return text.includes('eco')
  })
  if (targetCat) {
    products = products.filter((p: any) => {
      const catId = typeof p.category === 'object' ? p.category?.id : p.category
      return catId === targetCat.id
    })
  }

  return <EcoFriendlyClient products={products} categories={categories} />
}
