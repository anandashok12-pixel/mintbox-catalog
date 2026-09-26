import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import FamousBangaloreGiftsClient from '@/components/pages/FamousBangaloreGiftsClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: '15 Famous Bangalore Gifts for Corporate Hampers (2026)',
  description:
    'From GI-tagged Channapatna toys to Coorg coffee - 15 famous Bangalore gifts that belong in corporate hampers, with prices, cultural context, and courier tips.',
  alternates: { canonical: 'https://themintbox.in/bangalore-corporate-gifting/famous-bangalore-gifts' },
  openGraph: {
    title: '15 Famous Bangalore Gifts for Corporate Hampers (2026)',
    description:
      'From GI-tagged Channapatna toys to Coorg coffee - 15 famous Bangalore gifts that belong in corporate hampers, with prices, cultural context, and courier tips.',
  },
}

export const dynamic = 'force-dynamic'

export default async function FamousBangaloreGiftsPage() {
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
    console.error('[famous-bangalore-gifts] Payload query failed:', err)
  }

  return <FamousBangaloreGiftsClient products={products} categories={categories} />
}
