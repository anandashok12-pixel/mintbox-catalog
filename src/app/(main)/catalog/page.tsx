import { getPayload } from 'payload'
import configPromise from '@payload-config'
import CatalogClient from '@/components/catalog/CatalogClient'

export const metadata = { title: 'Catalogue - MintBox' }

export const revalidate = 60 // Revalidate every 60 seconds (ISR)

export default async function CatalogPage() {
  const payload = await getPayload({ config: configPromise })

  // Run both queries in parallel - they're independent. depth:1 is enough to
  // populate `category` and `image` relations; depth:2 was pulling nested
  // sub-relations that nothing on the page consumes.
  const [categoriesResult, productsResult] = await Promise.all([
    payload.find({
      collection: 'categories',
      sort: 'order',
      limit: 100,
    }),
    payload.find({
      collection: 'products',
      where: { inStock: { equals: true } },
      sort: 'order',
      limit: 500,
      depth: 1,
    }),
  ])

  return (
    <CatalogClient
      categories={categoriesResult.docs as any}
      products={productsResult.docs as any}
    />
  )
}
