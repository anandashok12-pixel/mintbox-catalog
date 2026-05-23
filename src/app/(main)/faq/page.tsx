import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { FAQPage } from '@/components/FAQPage'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

const FALLBACK_TITLE = 'MintBox FAQ | Corporate Gifting, MOQ, Branding, Delivery'
const FALLBACK_DESCRIPTION =
  'Get answers to common corporate gifting questions - minimum order quantity, branding quality, timelines, delivery coverage, pricing, and customisation with MintBox.'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config: configPromise })
    const data: any = await payload.findGlobal({ slug: 'faq-page' })
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

export default async function FAQRoute() {
  let data: any = {}
  try {
    const payload = await getPayload({ config: configPromise })
    data = await payload.findGlobal({ slug: 'faq-page' })
  } catch {
    // Global table may not exist yet during first build
  }
  return <FAQPage data={data} />
}
