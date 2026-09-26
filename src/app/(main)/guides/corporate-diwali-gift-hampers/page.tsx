import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import DiwaliHampersClient from '@/components/pages/DiwaliHampersClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Top 12 Corporate Diwali Gift Hampers (2026) | MintBox',
  description:
    'Top 12 corporate Diwali gift hampers for 2026, ranked with prices and contents - from snack boxes under ₹500 to executive hampers. Order by Oct 15.',
  alternates: { canonical: 'https://themintbox.in/guides/corporate-diwali-gift-hampers' },
  openGraph: {
    title: 'Top 12 Corporate Diwali Gift Hampers (2026) | MintBox',
    description:
      'Top 12 corporate Diwali gift hampers for 2026, ranked with prices and contents - from snack boxes under ₹500 to executive hampers. Order by Oct 15.',
  },
}

export const dynamic = 'force-dynamic'

export default async function DiwaliHampersPage() {
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
    console.error('[corporate-diwali-gift-hampers] Payload query failed:', err)
  }

  return <DiwaliHampersClient products={products} categories={categories} />
}
