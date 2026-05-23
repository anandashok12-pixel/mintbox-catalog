import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { AboutPageClient } from '@/components/AboutPageClient'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

const FALLBACK_TITLE = 'About MintBox | Premium Corporate Gifting in India'
const FALLBACK_DESCRIPTION =
  'Learn why MintBox was built, what we stand for, and how we deliver premium corporate gifting with transparent pricing and reliable Pan-India fulfillment.'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config: configPromise })
    const data: any = await payload.findGlobal({ slug: 'about-page' })
    return {
      title: data?.seo?.metaTitle || FALLBACK_TITLE,
      description: data?.seo?.metaDescription || FALLBACK_DESCRIPTION,
    }
  } catch {
    return {
      title: FALLBACK_TITLE,
      description: FALLBACK_DESCRIPTION,
    }
  }
}

export default async function AboutPage() {
  let data: any = {}
  try {
    const payload = await getPayload({ config: configPromise })
    data = await payload.findGlobal({ slug: 'about-page' })
  } catch {
    // Global table may not exist yet during first build
  }
  return <AboutPageClient data={data} />
}
