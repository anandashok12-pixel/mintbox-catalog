import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import SustainableGiftsClient from '@/components/pages/SustainableGiftsClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Sustainable Corporate Gifts for Indian Businesses | MintBox',
  description:
    'Eco-friendly and sustainable corporate gifts for ESG-conscious companies. Bamboo, seed kits, recycled stationery, and more. Bulk orders, pan-India delivery.',
  alternates: { canonical: 'https://themintbox.in/guides/sustainable-corporate-gifts' },
  openGraph: {
    title: 'Sustainable Corporate Gifts for Indian Businesses | MintBox',
    description:
      'Eco-friendly and sustainable corporate gifts for ESG-conscious companies. Bamboo, seed kits, recycled stationery, and more. Bulk orders, pan-India delivery.',
  },
}

export const dynamic = 'force-dynamic'

export default async function SustainableGiftsPage() {
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
    console.error('[sustainable-corporate-gifts] Payload query failed:', err)
  }

  return <SustainableGiftsClient products={products} categories={categories} />
}
