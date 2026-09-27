import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import { isPublished } from '@/lib/publishGate'
import DiwaliHampersRecipientClient from '@/components/pages/DiwaliHampersRecipientClient'
import '../../content-pages.css'

// Scheduled go-live — see src/lib/publishGate.ts.
export const PUBLISH_AT = '2026-09-29T00:00:00+05:30'

export const metadata: Metadata = {
  title: 'Diwali Hampers for Employees vs Clients: Budgets & Tiers (2026) | MintBox',
  description:
    'How to budget and build corporate Diwali hampers by recipient - employees, regular clients, and VIP/leadership - with three hamper tiers, branding rules and pan-India lead times.',
  alternates: { canonical: 'https://themintbox.in/guides/diwali-hampers-for-employees-vs-clients' },
  openGraph: {
    title: 'Diwali Hampers for Employees vs Clients: Budgets & Tiers (2026) | MintBox',
    description:
      'How to budget and build corporate Diwali hampers by recipient - employees, regular clients, and VIP/leadership.',
  },
}

export const dynamic = 'force-dynamic'

export default async function DiwaliHampersRecipientPage() {
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
    console.error('[diwali-hampers-for-employees-vs-clients] Payload query failed:', err)
  }

  return <DiwaliHampersRecipientClient products={products} categories={categories} />
}
