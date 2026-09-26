import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import BangaloreHampersClient from '@/components/pages/BangaloreHampersClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Top 10 Corporate Gift Hampers in Bangalore (2026)',
  description:
    'The 10 best corporate gift hampers in Bangalore, ranked with prices from ₹700 to ₹8,000 - contents, MOQs, and same-day delivery notes. Updated July 2026.',
  alternates: { canonical: 'https://themintbox.in/bangalore-corporate-gifting/gift-hampers' },
  openGraph: {
    title: 'Top 10 Corporate Gift Hampers in Bangalore (2026)',
    description:
      'The 10 best corporate gift hampers in Bangalore, ranked with prices from ₹700 to ₹8,000 - contents, MOQs, and same-day delivery notes. Updated July 2026.',
  },
}

export const dynamic = 'force-dynamic'

export default async function BangaloreHampersPage() {
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
    console.error('[gift-hampers] Payload query failed:', err)
  }

  return <BangaloreHampersClient products={products} categories={categories} />
}
