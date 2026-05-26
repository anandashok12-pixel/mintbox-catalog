import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import BangaloreCorporateGiftingClient from '@/components/pages/BangaloreCorporateGiftingClient'
import '../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gifting in Bangalore: Bulk & Same-Day Delivery | MintBox',
  description:
    'Corporate gifting in Bangalore - same-day delivery across Koramangala, Whitefield, HSR Layout & Electronic City. Bulk from 25 units, logo customisation included.',
  alternates: { canonical: 'https://themintbox.in/bangalore-corporate-gifting' },
  openGraph: {
    title: 'Corporate Gifting in Bangalore - MintBox',
    description: 'Same-day corporate gift delivery in Bangalore. Bulk orders from 25 units, logo customisation, GST-compliant invoicing.',
  },
}

export const dynamic = 'force-dynamic'

export default async function BangaloreCorporateGiftingPage() {
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
    console.error('[bangalore-corporate-gifting] Payload query failed:', err)
  }

  return <BangaloreCorporateGiftingClient products={products} categories={categories} />
}
