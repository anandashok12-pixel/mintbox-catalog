import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import AppreciationGiftsClient from '@/components/pages/AppreciationGiftsClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: '15 Employee Appreciation Gift Ideas (2026) | MintBox',
  description:
    '15 employee appreciation gift ideas mapped to spot, quarterly, and annual awards with ₹ budgets - plus how to build an R&R gifting calendar that actually lasts.',
  alternates: { canonical: 'https://themintbox.in/guides/employee-appreciation-gifts' },
  openGraph: {
    title: '15 Employee Appreciation Gift Ideas (2026) | MintBox',
    description:
      '15 employee appreciation gift ideas mapped to spot, quarterly, and annual awards with ₹ budgets - plus how to build an R&R gifting calendar that actually lasts.',
  },
}

export const dynamic = 'force-dynamic'

export default async function AppreciationGiftsPage() {
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
    console.error('[employee-appreciation-gifts] Payload query failed:', err)
  }

  return <AppreciationGiftsClient products={products} categories={categories} />
}
