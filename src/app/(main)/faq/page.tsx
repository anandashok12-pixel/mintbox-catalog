import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { FAQPage } from '@/components/FAQPage'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'FAQ — MintBox',
  description: 'Answers to the most common questions about MintBox corporate gifting — MOQs, branding, delivery, pricing, and more.',
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
