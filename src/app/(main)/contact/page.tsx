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
  let data: any = {}
  try {
    const payload = await getPayload({ config: configPromise })
    data = await payload.findGlobal({ slug: 'contact-page' })
  } catch {
    // Global table may not exist yet during first build
  }
  return <ContactPageClient data={data} />
}
