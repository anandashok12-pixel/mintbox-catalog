import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import EcoFriendlyClient from '@/components/pages/EcoFriendlyClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Eco-Friendly Corporate Gifts: Sustainable Gifting 2026 | MintBox',
  description:
    'Sustainable corporate gifts - seed paper notebooks, bamboo pens, jute bags, and recycled kits. ESG-aligned gifting from ₹150/unit. Bangalore & Pan-India.',
  alternates: { canonical: 'https://themintbox.in/collections/eco-friendly-gifts' },
  openGraph: {
    title: 'Eco-Friendly Corporate Gifts: Sustainable Gifting 2026 | MintBox',
    description:
      'Sustainable corporate gifts - seed paper notebooks, bamboo pens, jute bags, and recycled kits. ESG-aligned gifting from ₹150/unit. Bangalore & Pan-India.',
  },
}

export const dynamic = 'force-dynamic'

export default async function EcoFriendlyPage() {
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
    products = productsResult.docs
  } catch (err) {
    console.error('[eco-friendly-gifts] Payload query failed:', err)
  }

  // No "eco" category exists, so the previous substring match never hit and
  // the page fell back to rendering the entire catalog. Eco products are
  // spread across categories (cork drinkware, bamboo pens, planters, jute
  // baskets...), so match on material/eco keywords in name + features.
  const ECO_KEYWORDS =
    /\b(eco|ecodesk|bamboo|jute|cork|recycled|sustainable|plantable|planter|plant|biodegradable|terracotta|wooden|copper)\b/i
  products = products.filter((p: any) => {
    const features = Array.isArray(p.features) ? p.features.map((f: any) => f?.feature ?? '').join(' ') : ''
    return ECO_KEYWORDS.test(`${p.name ?? ''} ${features}`)
  })

  return <EcoFriendlyClient products={products} categories={categories} />
}
