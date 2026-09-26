import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import GstCorporateGiftsClient from '@/components/pages/GstCorporateGiftsClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'GST on Corporate Gifts: Rules + 10 Tax-Smart Ideas (2026)',
  description:
    'Plain-English guide to GST on corporate gifts in India - the ₹50,000 employee rule, blocked ITC under Section 17(5)(h), and 10 tax-smart gift ideas for 2026.',
  alternates: { canonical: 'https://themintbox.in/guides/gst-on-corporate-gifts' },
  openGraph: {
    title: 'GST on Corporate Gifts: Rules + 10 Tax-Smart Ideas (2026)',
    description:
      'Plain-English guide to GST on corporate gifts in India - the ₹50,000 employee rule, blocked ITC under Section 17(5)(h), and 10 tax-smart gift ideas for 2026.',
  },
}

export const dynamic = 'force-dynamic'

export default async function GstCorporateGiftsPage() {
  let products: any[] = []
  let categories: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const [catsResult, productsResult] = await Promise.all([
      payload.find({ collection: 'categories', sort: 'order', limit: 100, select: SHOWCASE_CATEGORY_SELECT }),
      payload.find({
        collection: 'products',
        where: { inStock: { equals: true } },
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
    console.error('[gst-on-corporate-gifts] Payload query failed:', err)
  }

  return <GstCorporateGiftsClient products={products} categories={categories} />
}
