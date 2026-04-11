import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export const maxDuration = 30

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('secret') !== 'mintbox-seed') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const results: string[] = []

    // Initialize each global with updateGlobal — creates the row if missing
    try {
      await payload.updateGlobal({ slug: 'about-page' as any, data: { hero: { titleLine1: 'We exist because' } } })
      results.push('about-page: ok')
    } catch (e: any) {
      results.push('about-page: ' + e.message)
    }

    try {
      await payload.updateGlobal({ slug: 'contact-page' as any, data: { hero: { label: 'Get in touch' } } })
      results.push('contact-page: ok')
    } catch (e: any) {
      results.push('contact-page: ' + e.message)
    }

    try {
      await payload.updateGlobal({ slug: 'faq-page' as any, data: { hero: { eyebrow: 'FAQ' } } })
      results.push('faq-page: ok')
    } catch (e: any) {
      results.push('faq-page: ' + e.message)
    }

    return NextResponse.json({ success: true, results })
  } catch (e: any) {
    return NextResponse.json({ error: e.message, stack: e.stack?.split('\n').slice(0, 5) }, { status: 500 })
  }
}
