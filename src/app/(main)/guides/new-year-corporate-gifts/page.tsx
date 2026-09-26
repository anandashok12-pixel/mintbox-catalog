import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import NewYearGiftsClient from '@/components/pages/NewYearGiftsClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: '15 New Year Corporate Gifts to Start 2027 Right | MintBox',
  description:
    '15 New Year corporate gifts to start 2027 right - planners, wellness kits, hampers and tech, with price ranges, MOQ and an ordering timeline for December.',
  alternates: { canonical: 'https://themintbox.in/guides/new-year-corporate-gifts' },
  openGraph: {
    title: '15 New Year Corporate Gifts to Start 2027 Right | MintBox',
    description:
      '15 New Year corporate gifts to start 2027 right - planners, wellness kits, hampers and tech, with price ranges, MOQ and an ordering timeline for December.',
  },
}

export const dynamic = 'force-dynamic'

export default async function NewYearGiftsPage() {
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
    console.error('[new-year-corporate-gifts] Payload query failed:', err)
  }

  return <NewYearGiftsClient products={products} categories={categories} />
}
