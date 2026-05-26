import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import DiwaliCorporateClient from '@/components/pages/DiwaliCorporateClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Diwali Corporate Gifts 2026: Best Ideas for Every Budget | MintBox',
  description:
    'Best Diwali corporate gifts for 2026 - hampers, drinkware, sweets kits, and eco sets. Budget ₹500–₹3,000 per head. Order early to avoid delays. Pan-India.',
  alternates: { canonical: 'https://themintbox.in/guides/diwali-corporate-gifts' },
  openGraph: {
    title: 'Diwali Corporate Gifts 2026: Best Ideas for Every Budget | MintBox',
    description:
      'Best Diwali corporate gifts for 2026 - hampers, drinkware, sweets kits, and eco sets. Budget ₹500–₹3,000 per head. Order early to avoid delays. Pan-India.',
  },
}

export const dynamic = 'force-dynamic'

export default async function DiwaliCorporatePage() {
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
    console.error('[diwali-corporate-gifts] Payload query failed:', err)
  }

  return <DiwaliCorporateClient products={products} categories={categories} />
}
