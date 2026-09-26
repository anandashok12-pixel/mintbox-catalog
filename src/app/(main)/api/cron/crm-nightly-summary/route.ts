import { NextRequest, NextResponse } from 'next/server'
import { isAuthorizedCronRequest } from '@/lib/cronAuth'
import { runNightlySummarySweep } from '@/lib/nightlySummary'

export const maxDuration = 60
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  if (!isAuthorizedCronRequest(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const result = await runNightlySummarySweep()
  const status = result.disabledReason ? 503 : result.failed > 0 ? 207 : 200

  return NextResponse.json({ success: result.failed === 0 && !result.disabledReason, ...result }, { status })
}
