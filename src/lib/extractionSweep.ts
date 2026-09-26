import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { extractDealContext } from './extraction'

export interface ExtractionSweepResult {
  candidates: number
  updated: number
  skipped: number
  failed: number
  failures: { dealId: string | number; error: string }[]
  disabledReason?: 'missing_anthropic_api_key'
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

/**
 * Extracts only open deals whose newest message is later than the last
 * successful extraction. The cap keeps a single cron invocation bounded;
 * oldest pending deals go first so a busy account cannot starve its backlog.
 */
export async function runExtractionSweep(maxDeals = 12): Promise<ExtractionSweepResult> {
  if (!process.env.ANTHROPIC_API_KEY?.trim()) {
    return {
      candidates: 0,
      updated: 0,
      skipped: 0,
      failed: 0,
      failures: [],
      disabledReason: 'missing_anthropic_api_key',
    }
  }

  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'deals',
    where: {
      and: [
        { stage: { not_in: ['won', 'lost'] } },
        { lastMessageAt: { exists: true } },
      ],
    },
    limit: 500,
    depth: 0,
  })

  const neverExtracted = docs.filter((deal) => !deal.lastExtractedAt)
  const previouslyExtracted = docs.filter((deal) => deal.lastExtractedAt)
  const pendingDealIds = new Set(neverExtracted.map((deal) => String(deal.id)))

  // sentAt can be old during a delayed WhatsApp history sync, so comparing
  // Deal.lastMessageAt to lastExtractedAt can miss a newly captured message.
  // Message.createdAt is the reliable high-water mark used by extraction.
  if (previouslyExtracted.length > 0) {
    const oldestHighWaterMark = previouslyExtracted.reduce((oldest, deal) => {
      const value = deal.lastExtractedAt as string
      return value < oldest ? value : oldest
    }, previouslyExtracted[0].lastExtractedAt as string)

    const messages = await payload.find({
      collection: 'messages',
      where: {
        and: [
          { deal: { in: previouslyExtracted.map((deal) => deal.id) } },
          { createdAt: { greater_than: oldestHighWaterMark } },
        ],
      },
      sort: 'createdAt',
      limit: 1000,
      depth: 0,
    })

    const dealById = new Map(previouslyExtracted.map((deal) => [String(deal.id), deal]))
    for (const message of messages.docs) {
      const messageDealId = typeof message.deal === 'object' && message.deal
        ? message.deal.id
        : message.deal
      if (messageDealId == null) continue

      const deal = dealById.get(String(messageDealId))
      if (deal?.lastExtractedAt && message.createdAt > deal.lastExtractedAt) {
        pendingDealIds.add(String(messageDealId))
      }
    }
  }

  const candidates = docs
    .filter((deal) => pendingDealIds.has(String(deal.id)))
    .sort((a, b) => {
      const aTime = new Date(a.lastExtractedAt || a.lastMessageAt || 0).getTime()
      const bTime = new Date(b.lastExtractedAt || b.lastMessageAt || 0).getTime()
      return aTime - bTime
    })
    .slice(0, maxDeals)

  let updated = 0
  let skipped = 0
  const failures: ExtractionSweepResult['failures'] = []

  // A small worker pool keeps the route inside Vercel's duration limit without
  // sending a burst of model requests for every open deal at once.
  const pending = [...candidates]
  const workers = Array.from({ length: Math.min(3, pending.length) }, async () => {
    while (pending.length > 0) {
      const deal = pending.shift()
      if (!deal) return

      try {
        const result = await extractDealContext(deal.id)
        if ('updated' in result) updated += 1
        else skipped += 1
      } catch (error) {
        failures.push({ dealId: deal.id, error: errorMessage(error) })
      }
    }
  })

  await Promise.all(workers)

  return {
    candidates: candidates.length,
    updated,
    skipped,
    failed: failures.length,
    failures,
  }
}
