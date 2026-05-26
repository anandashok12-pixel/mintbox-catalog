import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import EtiquetteGuideClient from '@/components/pages/EtiquetteGuideClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Gifting Etiquette in India | MintBox Guide',
  description: 'Learn corporate gifting etiquette for India: timing, budgets, personalisation, cultural dos & don\'ts. A practical guide for HR, admin, and procurement teams.',
  alternates: { canonical: 'https://themintbox.in/guides/corporate-gifting-etiquette' },
  openGraph: {
    title: 'Corporate Gifting Etiquette in India | MintBox Guide',
    description: 'Learn corporate gifting etiquette for India: timing, budgets, personalisation, cultural dos & don\'ts. A practical guide for HR, admin, and procurement teams.',
    url: 'https://themintbox.in/guides/corporate-gifting-etiquette',
    siteName: 'MintBox',
    locale: 'en_IN',
    type: 'article',
  },
}

export const dynamic = 'force-dynamic'

export default async function EtiquetteGuidePage() {
  let products: any[] = []
  let categories: any[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const [catsResult, productsResult] = await Promise.all([
      payload.find({ collection: 'categories', sort: 'order', limit: 100 }),
      payload.find({ collection: 'products', where: { inStock: { equals: true } }, sort: 'order', limit: 500, depth: 1 }),
    ])
    categories = catsResult.docs
    products = productsResult.docs
  } catch (err) {
    console.error('[corporate-gifting-etiquette] Payload query failed:', err)
  }
  return <EtiquetteGuideClient products={products} categories={categories} />
}
