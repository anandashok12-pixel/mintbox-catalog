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
    // Getting payload triggers the DB connection and schema push
    const payload = await getPayload({ config: configPromise })

    // Wait a moment for push:true to create tables
    await new Promise((r) => setTimeout(r, 3000))

    const results: string[] = []

    for (const slug of ['about-page', 'contact-page', 'faq-page'] as const) {
      try {
        await payload.updateGlobal({ slug, data: {} })
        results.push(`${slug}: initialized`)
      } catch (e: any) {
        results.push(`${slug}: ${e.message?.slice(0, 100)}`)
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (e: any) {
    return NextResponse.json({ error: e.message?.slice(0, 200) }, { status: 500 })
  }
}
