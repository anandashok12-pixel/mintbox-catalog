import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import HowToChooseClient from '@/components/pages/HowToChooseClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'How to Choose Corporate Gifts: A Practical 2026 Guide | MintBox',
  description:
    'Step-by-step guide to picking the right corporate gifts - by occasion, recipient, budget, and customisation. Avoid common mistakes. 200+ options from MintBox.',
  alternates: { canonical: 'https://themintbox.in/guides/how-to-choose-corporate-gifts' },
  openGraph: {
    title: 'How to Choose Corporate Gifts: A Practical 2026 Guide | MintBox',
    description:
      'Step-by-step guide to picking the right corporate gifts - by occasion, recipient, budget, and customisation. Avoid common mistakes. 200+ options from MintBox.',
  },
}

export const dynamic = 'force-dynamic'

export default async function HowToChoosePage() {
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
    console.error('[how-to-choose-corporate-gifts] Payload query failed:', err)
  }

  return <HowToChooseClient products={products} categories={categories} />
}
