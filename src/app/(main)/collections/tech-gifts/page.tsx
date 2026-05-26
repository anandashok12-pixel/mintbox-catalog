import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import TechGiftsCollectionClient from '@/components/pages/TechGiftsCollectionClient'
import '../../content-pages.css'

export const metadata: Metadata = {
  title: 'Corporate Tech Gifts: Gadgets & Accessories for Teams | MintBox',
  description:
    'Branded corporate tech gifts - wireless chargers, cable kits, laptop accessories, USB drives, and more. Logo engraving from 25 units. Premium gifting for IT teams.',
  alternates: { canonical: 'https://themintbox.in/collections/tech-gifts' },
  openGraph: {
    title: 'Corporate Tech Gifts: Gadgets & Accessories for Teams - MintBox',
    description: 'Branded corporate tech gifts - wireless chargers, cable kits, laptop accessories, USB drives, and more.',
  },
}

export const dynamic = 'force-dynamic'

export default async function TechGiftsPage() {
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
    console.error('[tech-gifts] Payload query failed:', err)
  }

  // Filter to category-relevant products only
  const targetCat = categories.find((c: any) => {
    const text = ((c.slug || '') + ' ' + (c.name || '')).toLowerCase()
    return text.includes('tech')
  })
  if (targetCat) {
    products = products.filter((p: any) => {
      const catId = typeof p.category === 'object' ? p.category?.id : p.category
      return catId === targetCat.id
    })
  }

  return <TechGiftsCollectionClient products={products} />
}
