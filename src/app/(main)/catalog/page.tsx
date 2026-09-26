import { getPayload } from 'payload'
import configPromise from '@payload-config'
import CatalogClient from '@/components/catalog/CatalogClient'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

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
  let loadFailed = false

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
    console.error('[catalog] Payload query failed:', err)
    loadFailed = true
  }

  // Distinguish "the catalog genuinely has no matches" (CatalogClient's own
  // empty state) from "we couldn't load the catalog at all" - the latter
  // used to fall through silently and render the same "no products found"
  // copy as a real empty filter result, which reads as a broken store.
  if (loadFailed) {
    return (
      <>
        <Navbar />
        <div className="catalog-load-error" role="alert">
          <p>We couldn&rsquo;t load the catalogue right now.</p>
          <p>Please refresh the page in a moment, or <a href="/contact">contact us</a> if this keeps happening.</p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <CatalogClient
      categories={categoriesDocs as any}
      products={productsDocs as any}
    />
  )
}
