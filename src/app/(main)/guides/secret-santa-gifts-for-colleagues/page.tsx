import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import SecretSantaGiftsClient from '@/components/pages/SecretSantaGiftsClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: '20 Secret Santa Gifts for Colleagues Under ₹500 (2026)',
  description:
    '20 Secret Santa gift ideas for colleagues, all under ₹500 with exact prices - quirky mugs, desk plants, office-safe funny picks, plus how to run the exchange.',
  alternates: { canonical: 'https://themintbox.in/guides/secret-santa-gifts-for-colleagues' },
  openGraph: {
    title: '20 Secret Santa Gifts for Colleagues Under ₹500 (2026)',
    description:
      '20 Secret Santa gift ideas for colleagues, all under ₹500 with exact prices - quirky mugs, desk plants, office-safe funny picks, plus how to run the exchange.',
  },
}

export const dynamic = 'force-dynamic'

export default async function SecretSantaGiftsPage() {
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
    console.error('[secret-santa-gifts-for-colleagues] Payload query failed:', err)
  }

  return <SecretSantaGiftsClient products={products} categories={categories} />
}
