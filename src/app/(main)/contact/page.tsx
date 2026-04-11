import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ContactPageClient } from '@/components/ContactPageClient'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Contact — MintBox',
  description: 'Get in touch with MintBox for premium corporate gifting. Request a quote, ask a question, or say hello.',
}

export default async function ContactPage() {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.findGlobal({ slug: 'contact-page' })
  return <ContactPageClient data={data as any} />
}
