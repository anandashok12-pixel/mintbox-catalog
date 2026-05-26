import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import CorporateGiftingHandbookClient from '@/components/pages/CorporateGiftingHandbookClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gifting Handbook: Complete India Guide for 2026 | MintBox',
  description:
    'The complete corporate gifting guide for Indian businesses - budgeting, choosing gifts, bulk ordering, customisation, and occasion planning. Updated for 2026.',
  alternates: { canonical: 'https://themintbox.in/guides/corporate-gifting-handbook' },
  openGraph: {
    title: 'The Corporate Gifting Handbook (2026) - MintBox',
    description: 'Complete guide to corporate gifting for Indian businesses - budgeting, customisation, bulk orders, and occasion planning.',
  },
}

export const dynamic = 'force-dynamic'

export default async function CorporateGiftingHandbookPage() {
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
        limit: 200,
        depth: 1,
      }),
    ])
    categories = catsResult.docs
    products = productsResult.docs
  } catch (err) {
    console.error('[corporate-gifting-handbook] Payload query failed:', err)
  }

  return <CorporateGiftingHandbookClient products={products} categories={categories} />
}
