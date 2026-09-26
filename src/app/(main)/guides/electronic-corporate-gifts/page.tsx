import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import ElectronicGiftsClient from '@/components/pages/ElectronicGiftsClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: '15 Electronic Corporate Gifts Employees Use (2026)',
  description:
    'Electronic corporate gifts employees actually use - earbuds, power banks, smartwatches and more with ₹ price ranges, branding notes, and bulk buying tips.',
  alternates: { canonical: 'https://themintbox.in/guides/electronic-corporate-gifts' },
  openGraph: {
    title: '15 Electronic Corporate Gifts Employees Use (2026)',
    description:
      'Electronic corporate gifts employees actually use - earbuds, power banks, smartwatches and more with ₹ price ranges, branding notes, and bulk buying tips.',
  },
}

export const dynamic = 'force-dynamic'

export default async function ElectronicGiftsPage() {
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
    console.error('[electronic-corporate-gifts] Payload query failed:', err)
  }

  return <ElectronicGiftsClient products={products} categories={categories} />
}
