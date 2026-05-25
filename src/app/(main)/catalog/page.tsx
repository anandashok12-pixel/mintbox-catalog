import { getPayload } from 'payload'
import configPromise from '@payload-config'
import CatalogClient from '@/components/catalog/CatalogClient'

export const metadata = {
  title: 'Catalogue - MintBox',
  description:
    'Browse the MintBox corporate gifting catalogue — sweets and mithai, gourmet hampers, drinkware, tech, apparel and eco-friendly gifts. Build a pack and request a quote.',
  alternates: { canonical: 'https://themintbox.in/catalog' },
}

// Render on every request: avoids build-time DB access (which fails on
// preview deploys where PAYLOAD_SECRET / DATABASE_URL may not be set),
// and lets Payload-driven catalog updates land instantly.
export const dynamic = 'force-dynamic'

export default async function CatalogPage() {
  let categoriesDocs: any[] = []
  let productsDocs: any[] = []

  try {
    const payload = await getPayload({ config: configPromise })
    const [categoriesResult, productsResult] = await Promise.all([
      payload.find({ collection: 'categories', sort: 'order', limit: 100 }),
      payload.find({
        collection: 'products',
        where: { inStock: { equals: true } },
        sort: 'order',
        limit: 500,
        depth: 1,
      }),
    ])
    categoriesDocs = categoriesResult.docs
    productsDocs = productsResult.docs
  } catch (err) {
    console.error('[catalog] Payload query failed; rendering empty catalog:', err)
  }

  return (
    <CatalogClient
      categories={categoriesDocs as any}
      products={productsDocs as any}
    />
  )
}
