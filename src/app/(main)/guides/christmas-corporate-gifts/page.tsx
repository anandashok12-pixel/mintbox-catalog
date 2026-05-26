import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ChristmasGiftsClient from '@/components/pages/ChristmasGiftsClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Christmas Corporate Gifts for Employees & Clients | MintBox',
  description:
    'Corporate Christmas gifts for Indian businesses - curated hampers, branded gifts, and festive sets. Order early, pan-India delivery from MintBox.',
  alternates: { canonical: 'https://themintbox.in/guides/christmas-corporate-gifts' },
  openGraph: {
    title: 'Christmas Corporate Gifts for Employees & Clients | MintBox',
    description:
      'Corporate Christmas gifts for Indian businesses - curated hampers, branded gifts, and festive sets. Order early, pan-India delivery from MintBox.',
  },
}

export const dynamic = 'force-dynamic'

export default async function ChristmasGiftsPage() {
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
    console.error('[christmas-corporate-gifts] Payload query failed:', err)
  }

  return <ChristmasGiftsClient products={products} categories={categories} />
}
