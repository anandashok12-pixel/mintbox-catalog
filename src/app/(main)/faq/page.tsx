import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { FAQPage } from '@/components/FAQPage'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'FAQ — MintBox',
  description: 'Answers to the most common questions about MintBox corporate gifting — MOQs, branding, delivery, pricing, and more.',
}

export default async function FAQRoute() {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.findGlobal({ slug: 'faq-page' })
  return <FAQPage data={data as any} />
}
