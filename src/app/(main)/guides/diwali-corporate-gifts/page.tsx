import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import DiwaliCorporateClient from '@/components/pages/DiwaliCorporateClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Diwali Corporate Gift Ideas 2026: Planning Guide by Budget | MintBox',
  description:
    'Diwali corporate gift ideas for 2026 by budget, with a planning timeline. Diwali is Sun 8 Nov; confirm by 24 Oct for guaranteed delivery. MOQ 10 units, GST invoice.',
  alternates: { canonical: 'https://themintbox.in/guides/diwali-corporate-gifts' },
  openGraph: {
    title: 'Diwali Corporate Gift Ideas 2026: Planning Guide by Budget | MintBox',
    description:
      'Diwali corporate gift ideas for 2026 by budget, with a planning timeline. Diwali is Sun 8 Nov; confirm by 24 Oct for guaranteed delivery. MOQ 10 units, GST invoice.',
  },
}

export const dynamic = 'force-dynamic'

export default async function DiwaliCorporatePage() {
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
    console.error('[diwali-corporate-gifts] Payload query failed:', err)
  }

  return <DiwaliCorporateClient products={products} categories={categories} />
}
