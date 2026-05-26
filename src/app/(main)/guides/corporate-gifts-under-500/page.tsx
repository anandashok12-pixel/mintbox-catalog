import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import BudgetUnder500Client from '@/components/pages/BudgetUnder500Client'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gifts Under ₹500: Best Budget Picks 2026 | MintBox',
  description:
    'Quality corporate gifts under ₹500 with logo printing. Budget picks from ₹75/unit - notebooks, bottles, eco kits. Bulk pricing from 50 units. Pan-India delivery.',
  alternates: { canonical: 'https://themintbox.in/guides/corporate-gifts-under-500' },
  openGraph: {
    title: 'Corporate Gifts Under ₹500 - MintBox',
    description: 'Best budget corporate gifts under ₹500 with bulk pricing and logo printing.',
  },
}

export const dynamic = 'force-dynamic'

export default async function BudgetUnder500Page() {
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
            { price: { less_than_equal: 500 } },
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
    console.error('[corporate-gifts-under-500] Payload query failed:', err)
  }

  return <BudgetUnder500Client products={products} categories={categories} />
}
