import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { backfillCrmFromLeads } from '@/lib/backfillCrmFromLeads'

export const maxDuration = 60
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const secret = process.env.SEED_SECRET?.trim()
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const write = body.write === true
  const payload = await getPayload({ config: configPromise })
  const summary = await backfillCrmFromLeads({ payload, write })

  return NextResponse.json({ success: summary.failures.length === 0, write, summary }, {
    status: summary.failures.length === 0 ? 200 : 207,
  })
}
