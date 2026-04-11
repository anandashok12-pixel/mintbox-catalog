import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { AboutPageClient } from '@/components/AboutPageClient'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'About — MintBox',
  description: 'The story behind MintBox — why we exist, what we believe, and the team behind premium corporate gifting.',
}

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.findGlobal({ slug: 'about-page' })
  return <AboutPageClient data={data as any} />
}
