import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

/**
 * Snooze / set-next-action for one deal. A required feature, not a nicety -
 * see the PRD: "a queue you cannot clear becomes a queue you stop opening".
 * `days: null` clears the snooze (brings the deal back into today's queue).
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })

  const { user } = await payload.auth({ headers: req.headers })
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const days = typeof body.days === 'number' ? body.days : null

  const nextActionAt = days === null ? null : new Date(Date.now() + days * 86400_000).toISOString()

  await payload.update({
    collection: 'deals',
    id,
    data: { nextActionAt },
  })

  return NextResponse.json({ success: true, nextActionAt })
}
