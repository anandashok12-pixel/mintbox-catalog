import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import { isPublished } from '@/lib/publishGate'
import DiwaliGiftsByBudgetClient from '@/components/pages/DiwaliGiftsByBudgetClient'
import '../../content-pages.css'

// Scheduled go-live — see src/lib/publishGate.ts.
export const PUBLISH_AT = '2026-09-27T00:00:00+05:30'

export const metadata: Metadata = {
  title: '15 Diwali Gift Ideas for Employees, by Budget (2026) | MintBox',
  description:
    '15 Diwali gift ideas for employees sorted into three budget bands - under ₹1,500, ₹1,500-3,000, and ₹3,000+. Branding, personalisation and bulk ordering timelines included.',
  alternates: { canonical: 'https://themintbox.in/guides/diwali-gifts-for-employees-by-budget' },
  openGraph: {
    title: '15 Diwali Gift Ideas for Employees, by Budget (2026) | MintBox',
    description:
      '15 Diwali gift ideas for employees sorted into three budget bands - under ₹1,500, ₹1,500-3,000, and ₹3,000+.',
  },
}

export const dynamic = 'force-dynamic'

export default async function DiwaliGiftsByBudgetPage() {
  if (!isPublished(PUBLISH_AT)) notFound()

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
    console.error('[diwali-gifts-for-employees-by-budget] Payload query failed:', err)
  }

  return <DiwaliGiftsByBudgetClient products={products} categories={categories} />
}
