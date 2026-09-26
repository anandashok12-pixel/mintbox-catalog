import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SHOWCASE_CATEGORY_SELECT, SHOWCASE_POPULATE, SHOWCASE_PRODUCT_SELECT } from '@/lib/showcaseQuery'
import WhatToGiftClient from '@/components/pages/WhatToGiftClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'What to Gift Employees: Corporate Gift Ideas | MintBox',
  description: 'Discover what to gift employees for Diwali, work anniversaries, and appreciation events. Curated corporate gift ideas from MintBox, Bangalore.',
  alternates: { canonical: 'https://themintbox.in/guides/what-to-gift-employees' },
  openGraph: {
    title: 'What to Gift Employees: Corporate Gift Ideas | MintBox',
    description: 'Discover what to gift employees for Diwali, work anniversaries, and appreciation events. Curated corporate gift ideas from MintBox, Bangalore.',
    url: 'https://themintbox.in/guides/what-to-gift-employees',
    siteName: 'MintBox',
    locale: 'en_IN',
    type: 'article',
  },
}

export const dynamic = 'force-dynamic'

export default async function WhatToGiftPage() {
  let products: any[] = []
  let categories: any[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const [catsResult, productsResult] = await Promise.all([
      payload.find({ collection: 'categories', sort: 'order', limit: 100, select: SHOWCASE_CATEGORY_SELECT }),
      payload.find({ collection: 'products', where: { inStock: { equals: true } }, sort: 'order', limit: 500, depth: 1, select: SHOWCASE_PRODUCT_SELECT, populate: SHOWCASE_POPULATE }),
    ])
    categories = catsResult.docs
    products = productsResult.docs
  } catch (err) {
    console.error('[what-to-gift-employees] Payload query failed:', err)
  }
  return <WhatToGiftClient products={products} categories={categories} />
}
