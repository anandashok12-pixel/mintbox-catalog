import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import CatalogClient from '@/components/catalog/CatalogClient'
import { CATALOG_TAG } from '@/lib/catalogCache'
import { slimProducts } from '@/lib/slimProducts'

export const metadata = {
  title: 'Corporate Gifting Catalogue: Browse All Products | MintBox',
  description:
    'Browse the MintBox corporate gifting catalogue: sweets, gourmet hampers, drinkware, tech, apparel and eco-friendly gifts. Build a pack and request a quote.',
  alternates: { canonical: 'https://themintbox.in/catalog' },
}

// Render on every request: avoids build-time DB access (which fails on
// preview deploys where PAYLOAD_SECRET / DATABASE_URL may not be set).
// The data itself is cached below, so a request is render-only.
export const dynamic = 'force-dynamic'

// The full-catalogue query (630+ products at depth 1) took 4-7s per request.
// Cache it: Products / Categories / Media hooks invalidate CATALOG_TAG on
// every CMS change, and the timer covers writes made outside the app
// (import scripts). A failed query throws, so it is never cached.
const getCatalog = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })
    const [categoriesResult, productsResult] = await Promise.all([
      payload.find({ collection: 'categories', sort: 'order', limit: 100 }),
      payload.find({
        collection: 'products',
        where: { inStock: { equals: true } },
        sort: 'order',
        // No cap: the in-stock catalogue outgrew fixed limits (630 products, Oct 2026)
        pagination: false,
        depth: 1,
      }),
    ])
    return {
      categories: categoriesResult.docs,
      // Only the fields the client uses: keeps the cache entry and HTML small.
      products: slimProducts(productsResult.docs),
    }
  },
  ['catalog-page'],
  { tags: [CATALOG_TAG], revalidate: 300 },
)

export default async function CatalogPage() {
  let categoriesDocs: any[] = []
  let productsDocs: any[] = []

  try {
    const catalog = await getCatalog()
    categoriesDocs = catalog.categories
    productsDocs = catalog.products
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
