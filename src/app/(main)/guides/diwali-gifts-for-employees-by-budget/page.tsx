import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { isPublished } from '@/lib/publishGate'
import DiwaliGiftsByBudgetClient from '@/components/pages/DiwaliGiftsByBudgetClient'
import '../../content-pages.css'
import { slimProducts } from '@/lib/slimProducts'

const PUBLISH_DATE = '2026-09-27'

export const metadata: Metadata = {
  title: '15 Diwali Gift Ideas for Employees by Budget | MintBox',
  description:
    '15 Diwali gift ideas for employees in 3 budget bands, from ₹1,500 to ₹3,000+. Personalisation tips, packaging ideas, MOQs and lead times for bulk orders.',
  alternates: { canonical: 'https://themintbox.in/guides/diwali-gifts-for-employees-by-budget' },
  openGraph: {
    title: '15 Diwali Gift Ideas for Employees by Budget (2026)',
    description:
      '15 Diwali gift ideas for employees in 3 budget bands, from ₹1,500 to ₹3,000+. Personalisation tips, packaging ideas, MOQs and lead times for bulk orders.',
  },
}

export const dynamic = 'force-dynamic'

export default async function DiwaliGiftsByBudgetPage() {
  if (!isPublished(PUBLISH_DATE)) {
    notFound()
  }

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
    products = slimProducts(productsResult.docs)
  } catch (err) {
    console.error('[diwali-gifts-for-employees-by-budget] Payload query failed:', err)
  }

  return <DiwaliGiftsByBudgetClient products={products} categories={categories} />
}
