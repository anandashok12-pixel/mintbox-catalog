import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { AboutPageClient } from '@/components/AboutPageClient'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About - MintBox',
  description: 'The story behind MintBox - why we exist, what we believe, and the team behind premium corporate gifting.',
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
