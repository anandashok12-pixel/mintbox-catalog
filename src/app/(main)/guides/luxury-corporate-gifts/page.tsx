import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import LuxuryGiftsClient from '@/components/pages/LuxuryGiftsClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: '12 Luxury Corporate Gifts for VIP Clients (2026)',
  description:
    'Luxury corporate gifts for VIP clients and leadership - 12 ideas from ₹2,000 to ₹10,000+ with compliance notes, presentation tips, and bulk options.',
  alternates: { canonical: 'https://themintbox.in/guides/luxury-corporate-gifts' },
  openGraph: {
    title: '12 Luxury Corporate Gifts for VIP Clients (2026)',
    description:
      'Luxury corporate gifts for VIP clients and leadership - 12 ideas from ₹2,000 to ₹10,000+ with compliance notes, presentation tips, and bulk options.',
  },
}

export const dynamic = 'force-dynamic'

export default async function LuxuryGiftsPage() {
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
    console.error('[luxury-corporate-gifts] Payload query failed:', err)
  }

  return <LuxuryGiftsClient products={products} categories={categories} />
}
