import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import { isPublished } from '@/lib/publishGate'
import GiftsByOccasionClient from '@/components/pages/GiftsByOccasionClient'
import '../../content-pages.css'

// Scheduled go-live — see src/lib/publishGate.ts.
export const PUBLISH_AT = '2026-10-02T00:00:00+05:30'

export const metadata: Metadata = {
  title: 'Corporate Gifts by Occasion: Onboarding, Festivals & Clients (2026) | MintBox',
  description:
    'Match the right corporate gift to the right moment - onboarding welcome kits, festive hampers, and client appreciation gifts - with budget tiers, branding methods and a procurement checklist.',
  alternates: { canonical: 'https://themintbox.in/guides/corporate-gifts-by-occasion' },
  openGraph: {
    title: 'Corporate Gifts by Occasion: Onboarding, Festivals & Clients (2026) | MintBox',
    description:
      'Match the right corporate gift to the right moment - onboarding welcome kits, festive hampers, and client appreciation gifts.',
  },
}

export const dynamic = 'force-dynamic'

export default async function GiftsByOccasionPage() {
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
    console.error('[corporate-gifts-by-occasion] Payload query failed:', err)
  }

  return <GiftsByOccasionClient products={products} categories={categories} />
}
