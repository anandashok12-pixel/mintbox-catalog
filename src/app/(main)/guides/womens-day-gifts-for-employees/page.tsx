import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import WomensDayGiftsClient from '@/components/pages/WomensDayGiftsClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: "15 Women's Day Gift Ideas for Employees (2026) | MintBox",
  description:
    "15 thoughtful Women's Day gift ideas for employees in 2026 - wellness hampers, workshops and desk upgrades, plus what to avoid so it never feels tokenistic.",
  alternates: { canonical: 'https://themintbox.in/guides/womens-day-gifts-for-employees' },
  openGraph: {
    title: "15 Women's Day Gift Ideas for Employees (2026) | MintBox",
    description:
      "15 thoughtful Women's Day gift ideas for employees in 2026 - wellness hampers, workshops and desk upgrades, plus what to avoid so it never feels tokenistic.",
  },
}

export const dynamic = 'force-dynamic'

export default async function WomensDayGiftsPage() {
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
    console.error('[womens-day-gifts-for-employees] Payload query failed:', err)
  }

  return <WomensDayGiftsClient products={products} categories={categories} />
}
