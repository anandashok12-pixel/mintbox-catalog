import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Diwali2026PreviewClient from '@/components/pages/Diwali2026PreviewClient'
import { DIWALI_2026_CATEGORIES, DIWALI_2026_PRODUCTS } from '@/data/diwali2026Products'
import '../../content-pages.css'

// Local review only. This route must never be reachable in a deployed build:
// every product here is status: "draft" and none of this has been through
// image-rights or final-pricing approval yet.
export const metadata: Metadata = {
  title: 'Diwali 2026 Catalog - Local Review',
  robots: { index: false, follow: false },
}

export default function Diwali2026CatalogPreviewPage() {
  if (process.env.NODE_ENV === 'production') notFound()

  return <Diwali2026PreviewClient products={DIWALI_2026_PRODUCTS} categories={DIWALI_2026_CATEGORIES} />
}
