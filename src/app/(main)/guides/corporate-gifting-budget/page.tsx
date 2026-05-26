import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import GiftingBudgetClient from '@/components/pages/GiftingBudgetClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gifting Budget: How to Plan & Optimise Spend | MintBox',
  description:
    'How to plan a corporate gifting budget - by company size, occasion, and ROI. Includes budget templates, per-employee benchmarks, and bulk pricing guide.',
  alternates: { canonical: 'https://themintbox.in/guides/corporate-gifting-budget' },
  openGraph: {
    title: 'Corporate Gifting Budget: How to Plan & Optimise Spend | MintBox',
    description:
      'How to plan a corporate gifting budget - by company size, occasion, and ROI. Includes budget templates, per-employee benchmarks, and bulk pricing guide.',
  },
}

export const dynamic = 'force-dynamic'

export default async function GiftingBudgetPage() {
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
    console.error('[corporate-gifting-budget] Payload query failed:', err)
  }

  return <GiftingBudgetClient products={products} categories={categories} />
}
