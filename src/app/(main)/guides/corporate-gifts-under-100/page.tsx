import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import BudgetUnder100Client from '@/components/pages/BudgetUnder100Client'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gifts Under ₹100: Affordable Bulk Ideas 2026 | MintBox',
  description:
    'Best corporate gifts under ₹100 for large-scale events and giveaways. Pens, seed packets, badges, stickers - logo-printed from 100 units. Pan-India bulk delivery.',
  alternates: { canonical: 'https://themintbox.in/guides/corporate-gifts-under-100' },
  openGraph: {
    title: 'Corporate Gifts Under ₹100 - MintBox',
    description: 'Best affordable corporate gifts under ₹100 for bulk events and large-scale giveaways.',
  },
}

export const dynamic = 'force-dynamic'

export default async function BudgetUnder100Page() {
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
            { price: { less_than_equal: 100 } },
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
    console.error('[corporate-gifts-under-100] Payload query failed:', err)
  }

  return <BudgetUnder100Client products={products} categories={categories} />
}
