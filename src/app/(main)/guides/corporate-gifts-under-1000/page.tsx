import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import BudgetGiftsClient from '@/components/pages/BudgetGiftsClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gifts Under ₹1000: Best Budget Options for 2026 | MintBox',
  description:
    'Quality corporate gifts under ₹1,000. Browse mugs, notebooks, eco kits, and more. Bulk pricing from 50 units, logo customisation included. Pan-India delivery.',
  alternates: { canonical: 'https://themintbox.in/guides/corporate-gifts-under-1000' },
  openGraph: {
    title: 'Corporate Gifts Under ₹1000 - MintBox',
    description: 'Best budget corporate gifts under ₹1,000 with bulk pricing and logo customisation.',
  },
}

export const dynamic = 'force-dynamic'

export default async function BudgetGiftsPage() {
  let products: any[] = []
  let categories: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const [catsResult, productsResult] = await Promise.all([
      payload.find({ collection: 'categories', sort: 'order', limit: 100 }),
      payload.find({
        collection: 'products',
        where: {
          and: [
            { inStock: { equals: true } },
            { price: { less_than_equal: 1000 } },
          ],
        },
        sort: 'price',
        limit: 200,
        depth: 1,
      }),
    ])
    categories = catsResult.docs
    products = productsResult.docs
  } catch (err) {
    console.error('[budget-gifts] Payload query failed:', err)
  }

  return <BudgetGiftsClient products={products} categories={categories} />
}
