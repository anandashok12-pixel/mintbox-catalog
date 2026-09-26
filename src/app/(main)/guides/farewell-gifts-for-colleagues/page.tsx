import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import FarewellGiftsClient from '@/components/pages/FarewellGiftsClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: '25 Farewell Gift Ideas for Colleagues (2026) | MintBox',
  description:
    '25 farewell gift ideas for colleagues across every budget - from ₹200 desk plants to premium hampers. Etiquette, card messages, and bulk options included.',
  alternates: { canonical: 'https://themintbox.in/guides/farewell-gifts-for-colleagues' },
  openGraph: {
    title: '25 Farewell Gift Ideas for Colleagues (2026) | MintBox',
    description:
      '25 farewell gift ideas for colleagues across every budget - from ₹200 desk plants to premium hampers. Etiquette, card messages, and bulk options included.',
  },
}

export const dynamic = 'force-dynamic'

export default async function FarewellGiftsPage() {
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
    console.error('[farewell-gifts-for-colleagues] Payload query failed:', err)
  }

  return <FarewellGiftsClient products={products} categories={categories} />
}
