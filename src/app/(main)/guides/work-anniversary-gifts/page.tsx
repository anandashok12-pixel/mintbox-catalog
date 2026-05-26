import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import WorkAnniversaryClient from '@/components/pages/WorkAnniversaryClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Work Anniversary Gifts for Employees | Ideas | MintBox',
  description:
    'Celebrate work anniversaries with memorable corporate gifts. Ideas by milestone year from MintBox - personalised, branded, and GST-compliant.',
  alternates: { canonical: 'https://themintbox.in/guides/work-anniversary-gifts' },
  openGraph: {
    title: 'Work Anniversary Gifts for Employees | Ideas | MintBox',
    description:
      'Celebrate work anniversaries with memorable corporate gifts. Ideas by milestone year from MintBox - personalised, branded, and GST-compliant.',
  },
}

export const dynamic = 'force-dynamic'

export default async function WorkAnniversaryPage() {
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
    console.error('[work-anniversary-gifts] Payload query failed:', err)
  }

  return <WorkAnniversaryClient products={products} categories={categories} />
}
