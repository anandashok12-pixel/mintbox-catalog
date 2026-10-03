import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { isPublished } from '@/lib/publishGate'
import GiftsByOccasionClient from '@/components/pages/GiftsByOccasionClient'
import '../../content-pages.css'
import { slimProducts } from '@/lib/slimProducts'

const PUBLISH_DATE = '2026-10-02'

export const metadata: Metadata = {
  title: 'Corporate Gifts by Occasion: A Planning Guide | MintBox',
  description:
    'Match the gift to the moment: onboarding kits, festive hampers, and client appreciation gifts. Budget tiers, gift categories, MOQs and a bulk-order checklist.',
  alternates: { canonical: 'https://themintbox.in/guides/corporate-gifts-by-occasion' },
  openGraph: {
    title: 'Corporate Gifts by Occasion: Onboarding, Festivals & Clients',
    description:
      'Match the gift to the moment: onboarding kits, festive hampers, and client appreciation gifts. Budget tiers, gift categories, MOQs and a bulk-order checklist.',
  },
}

export const dynamic = 'force-dynamic'

export default async function GiftsByOccasionPage() {
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
    console.error('[corporate-gifts-by-occasion] Payload query failed:', err)
  }

  return <GiftsByOccasionClient products={products} categories={categories} />
}
