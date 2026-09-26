import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import TopGiftingCompaniesClient from '@/components/pages/TopGiftingCompaniesClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Top 10 Corporate Gifting Companies in Bangalore (2026)',
  description:
    'The 10 best corporate gifting companies in Bangalore, ranked and compared on MOQ, turnaround, customisation, and delivery. Updated July 2026.',
  alternates: { canonical: 'https://themintbox.in/bangalore-corporate-gifting/top-companies' },
  openGraph: {
    title: 'Top 10 Corporate Gifting Companies in Bangalore (2026)',
    description:
      'The 10 best corporate gifting companies in Bangalore, ranked and compared on MOQ, turnaround, customisation, and delivery. Updated July 2026.',
  },
}

export const dynamic = 'force-dynamic'

export default async function TopGiftingCompaniesPage() {
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
    console.error('[top-companies] Payload query failed:', err)
  }

  return <TopGiftingCompaniesClient products={products} categories={categories} />
}
