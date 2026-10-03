import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import BudgetCorporateGiftsClient from '@/components/pages/BudgetCorporateGiftsClient'
import '../../content-pages.css'
import { slimProducts } from '@/lib/slimProducts'

export const metadata: Metadata = {
  title: 'Budget Corporate Gifts: Smart Gifting | MintBox',
  description:
    'How to buy quality corporate gifts on a budget. Compare price tiers from ₹100 to ₹2,000, see what each level gets you and get bulk pricing. Free quote.',
  alternates: { canonical: 'https://themintbox.in/guides/budget-corporate-gifts' },
  openGraph: {
    title: 'Budget Corporate Gifts: Smart Gifting | MintBox',
    description:
      'How to buy quality corporate gifts on a budget. Compare price tiers from ₹100 to ₹2,000, see what each level gets you and get bulk pricing. Free quote.',
  },
}

export const dynamic = 'force-dynamic'

export default async function BudgetCorporateGiftsPage() {
  let products: any[] = []
  let categories: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const [catsResult, productsResult] = await Promise.all([
      payload.find({ collection: 'categories', sort: 'order', limit: 100 }),
      payload.find({
        collection: 'products',
        where: { inStock: { equals: true } },
        sort: 'price',
        limit: 500,
        depth: 1,
      }),
    ])
    categories = catsResult.docs
    products = slimProducts(productsResult.docs)
  } catch (err) {
    console.error('[budget-corporate-gifts] Payload query failed:', err)
  }

  return <BudgetCorporateGiftsClient products={products} categories={categories} />
}
