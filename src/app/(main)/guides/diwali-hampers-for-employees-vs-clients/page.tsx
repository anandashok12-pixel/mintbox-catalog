import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { isPublished } from '@/lib/publishGate'
import DiwaliHampersRecipientClient from '@/components/pages/DiwaliHampersRecipientClient'
import '../../content-pages.css'
import { slimProducts } from '@/lib/slimProducts'

const PUBLISH_DATE = '2026-09-29'

export const metadata: Metadata = {
  title: 'Diwali Hampers: Employees vs Clients vs VIPs | MintBox',
  description:
    'How to budget Diwali hampers by recipient: employees (₹500 to 1,500), clients (₹1,500 to 5,000) and VIPs (bespoke). Three hamper tiers, lead times and MOQs.',
  alternates: { canonical: 'https://themintbox.in/guides/diwali-hampers-for-employees-vs-clients' },
  openGraph: {
    title: 'Diwali Hampers for Employees vs Clients vs VIPs (2026)',
    description:
      'How to budget Diwali hampers by recipient: employees (₹500 to 1,500), clients (₹1,500 to 5,000) and VIPs (bespoke). Three hamper tiers, lead times and MOQs.',
  },
}

export const dynamic = 'force-dynamic'

export default async function DiwaliHampersRecipientPage() {
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
    console.error('[diwali-hampers-for-employees-vs-clients] Payload query failed:', err)
  }

  return <DiwaliHampersRecipientClient products={products} categories={categories} />
}
