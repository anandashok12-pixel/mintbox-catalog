import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import DiwaliClientGiftsClient from '@/components/pages/DiwaliClientGiftsClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: "15 Diwali Gifts for Clients That Aren't Dry Fruits (2026)",
  description:
    '15 Diwali gift ideas for clients that skip the dry-fruit cliché - gourmet trunks, brass décor, artisan crafts and more, with budgets per client tier for 2026.',
  alternates: { canonical: 'https://themintbox.in/guides/diwali-gifts-for-clients' },
  openGraph: {
    title: "15 Diwali Gifts for Clients That Aren't Dry Fruits (2026)",
    description:
      '15 Diwali gift ideas for clients that skip the dry-fruit cliché - gourmet trunks, brass décor, artisan crafts and more, with budgets per client tier for 2026.',
  },
}

export const dynamic = 'force-dynamic'

export default async function DiwaliClientGiftsPage() {
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
    console.error('[diwali-gifts-for-clients] Payload query failed:', err)
  }

  return <DiwaliClientGiftsClient products={products} categories={categories} />
}
