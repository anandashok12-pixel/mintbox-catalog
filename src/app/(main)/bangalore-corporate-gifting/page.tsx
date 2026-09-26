import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import BangaloreCorporateGiftingClient from '@/components/pages/BangaloreCorporateGiftingClient'
import '../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gifting in Bangalore: Bulk & Same-Day Delivery | MintBox',
  description:
    'Corporate gifting in Bangalore - same-day delivery across Koramangala, Whitefield, HSR Layout & Electronic City. Bulk from 10 units, logo customisation included.',
  alternates: { canonical: 'https://themintbox.in/bangalore-corporate-gifting' },
  openGraph: {
    title: 'Corporate Gifting in Bangalore - MintBox',
    description: 'Same-day corporate gift delivery in Bangalore. Bulk orders from 10 units, logo customisation, GST-compliant invoicing.',
  },
}

export const dynamic = 'force-dynamic'

export default async function BangaloreCorporateGiftingPage() {
  let products: any[] = []
  let categories: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const [catsResult, productsResult] = await Promise.all([
      payload.find({ collection: 'categories', sort: 'order', limit: 100, select: SHOWCASE_CATEGORY_SELECT }),
      payload.find({
        collection: 'products',
        // The showcase caps its price slider at ₹5,000, so pricier items can never render here.
        where: { and: [{ inStock: { equals: true } }, { price: { less_than_equal: 5000 } }] },
        sort: 'order',
        limit: 500,
        depth: 1,
      select: SHOWCASE_PRODUCT_SELECT,
      populate: SHOWCASE_POPULATE,
      }),
    ])
    categories = catsResult.docs
    products = productsResult.docs
  } catch (err) {
    console.error('[bangalore-corporate-gifting] Payload query failed:', err)
  }

  return <BangaloreCorporateGiftingClient products={products} categories={categories} />
}
