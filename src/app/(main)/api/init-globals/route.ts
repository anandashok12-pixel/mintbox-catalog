import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export const maxDuration = 60

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('secret') !== 'mintbox-seed') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config: configPromise })

    // Force DB schema push — creates missing tables
    if (payload.db && typeof (payload.db as any).push === 'function') {
      await (payload.db as any).push({ forceAcceptWarning: true })
    } else if (payload.db && typeof (payload.db as any).connect === 'function') {
      // Re-connect triggers schema push on adapters with push:true
      await (payload.db as any).connect()
    }

    // Wait for schema push
    await new Promise((r) => setTimeout(r, 5000))

    const results: string[] = []

    for (const slug of ['about-page', 'contact-page', 'faq-page'] as const) {
      try {
        await payload.updateGlobal({ slug, data: {} })
        results.push(`${slug}: initialized`)
      } catch (e: any) {
        results.push(`${slug}: ${e.message?.slice(0, 150)}`)
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (e: any) {
    return NextResponse.json({ error: e.message?.slice(0, 300) }, { status: 500 })
  }
}
