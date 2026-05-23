import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ContactPageClient } from '@/components/ContactPageClient'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

const FALLBACK_TITLE = 'Contact MintBox | Request a Corporate Gifting Quote'
const FALLBACK_DESCRIPTION =
  'Contact MintBox to plan onboarding kits, festive gifting, client gifts, and team hampers. Share your team size, occasion, and budget to get a curated quote.'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config: configPromise })
    const data: any = await payload.findGlobal({ slug: 'contact-page' })
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

export default async function ContactPage() {
  let data: any = {}
  try {
    const payload = await getPayload({ config: configPromise })
    data = await payload.findGlobal({ slug: 'contact-page' })
  } catch {
    // Global table may not exist yet during first build
  }
  return <ContactPageClient data={data} />
}
