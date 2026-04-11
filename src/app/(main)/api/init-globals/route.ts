import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('secret') !== 'mintbox-seed') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config: configPromise })
  const results: string[] = []

  const slugs = ['about-page', 'contact-page', 'faq-page'] as const
  for (const slug of slugs) {
    try {
      await payload.findGlobal({ slug })
      results.push(`${slug}: already exists`)
    } catch {
      await payload.updateGlobal({ slug, data: {} })
      results.push(`${slug}: initialized`)
    }
  }

  return NextResponse.json({ success: true, results })
}
