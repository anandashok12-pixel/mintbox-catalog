import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { DEAL_STAGES, LOST_REASONS } from '@/collections/Deals'

export const dynamic = 'force-dynamic'

const VALID_STAGES = new Set(DEAL_STAGES.map((s) => s.value))
const VALID_LOST_REASONS = new Set(LOST_REASONS.map((r) => r.value))

/**
 * Moves a deal to a new stage - the board's one write path, whether the
 * move came from a drag or the dropdown (the PRD's "primary control on
 * mobile"). Always a human action: this always sets stageSetManually so
 * the nightly extraction pass never drags a card back overnight.
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config: configPromise })

  const { user } = await payload.auth({ headers: req.headers })
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const { stage, lostReason } = body

  if (!VALID_STAGES.has(stage)) {
    return NextResponse.json({ error: 'Invalid stage' }, { status: 400 })
  }
  if (stage === 'lost' && lostReason && !VALID_LOST_REASONS.has(lostReason)) {
    return NextResponse.json({ error: 'Invalid lost reason' }, { status: 400 })
  }

  const deal = await payload.update({
    collection: 'deals',
    id,
    data: {
      stage,
      stageSetManually: true,
      ...(stage === 'lost' && lostReason ? { lostReason } : {}),
    },
  })

  return NextResponse.json({ success: true, deal })
}
