import type { NextRequest } from 'next/server'

/**
 * Vercel Cron authenticates with CRON_SECRET. The query-string fallback is
 * kept for the repo's existing manual curl workflow, but only when an
 * explicit SEED_SECRET is configured.
 */
export function isAuthorizedCronRequest(req: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET?.trim()
  const isVercelCron = Boolean(
    cronSecret && req.headers.get('authorization') === `Bearer ${cronSecret}`,
  )

  const manualSecret = process.env.SEED_SECRET?.trim()
  const suppliedManualSecret = new URL(req.url).searchParams.get('secret')
  const isManual = Boolean(manualSecret && suppliedManualSecret === manualSecret)

  return isVercelCron || isManual
}
