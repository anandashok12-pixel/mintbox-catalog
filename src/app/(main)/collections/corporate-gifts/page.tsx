import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import CollectionsHubClient from '@/components/pages/CollectionsHubClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gift Collections: Hampers, Kits & Curated Sets | MintBox',
  description:
    'Browse 200+ corporate gifts - drinkware, stationery, tech gadgets, hampers, eco-friendly gifts and apparel. Filter by category, occasion, and budget.',
  alternates: { canonical: 'https://themintbox.in/collections/corporate-gifts' },
  openGraph: {
    title: 'Corporate Gift Collections - MintBox',
    description: 'Curated corporate gifting collections for every occasion and budget.',
  },
}

export const dynamic = 'force-dynamic'

export default async function CollectionsHubPage() {
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
    console.error('[collections-hub] Payload query failed:', err)
  }

  return <CollectionsHubClient products={products} categories={categories} />
}
