import { getPayload } from 'payload'
import configPromise from '@payload-config'
import CatalogClient from '@/components/catalog/CatalogClient'

export const metadata = { title: 'Catalogue — MintBox' }

export const revalidate = 60 // Revalidate every 60 seconds (ISR)

export default async function CatalogPage() {
  const payload = await getPayload({ config: configPromise })

  const categoriesResult = await payload.find({
    collection: 'categories',
    sort: 'order',
    limit: 100,
  })

  const productsResult = await payload.find({
    collection: 'products',
    where: {
      inStock: { equals: true },
    },
    sort: 'order',
    limit: 500,
    depth: 2,
  })

  return (
    <CatalogClient
      categories={categoriesResult.docs as any}
      products={productsResult.docs as any}
    />
  )
}
