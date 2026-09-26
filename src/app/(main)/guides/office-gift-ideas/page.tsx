import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import OfficeGiftIdeasClient from '@/components/pages/OfficeGiftIdeasClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: '20 Office Gift Ideas for Every Occasion (2026)',
  description:
    'Office gift ideas for every occasion - everyday appreciation, festivals, milestones, and team events, with ₹ budgets per occasion and bulk ordering tips.',
  alternates: { canonical: 'https://themintbox.in/guides/office-gift-ideas' },
  openGraph: {
    title: '20 Office Gift Ideas for Every Occasion (2026)',
    description:
      'Office gift ideas for every occasion - everyday appreciation, festivals, milestones, and team events, with ₹ budgets per occasion and bulk ordering tips.',
  },
}

export const dynamic = 'force-dynamic'

export default async function OfficeGiftIdeasPage() {
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
    console.error('[office-gift-ideas] Payload query failed:', err)
  }

  return <OfficeGiftIdeasClient products={products} categories={categories} />
}
