import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { buildQueue, type QueuedDeal, type ScorableDeal } from './scoring'

export interface QueueRow extends QueuedDeal {
  contactName: string
  contactCompany?: string | null
  contactPhoneE164?: string | null
  nextAction?: string | null
}

const DAILY_CAP = 15

/**
 * Fetches every open deal, scores it, and splits the result into the daily
 * list (buckets 1-4, capped at 15 - see the PRD's "a queue you cannot clear
 * becomes a queue you stop opening") and the dormant list, which is a
 * weekly-review concern and never crowds the daily view or digest.
 */
export async function buildDailyQueue(): Promise<{ daily: QueueRow[]; dormant: QueueRow[]; totalOpen: number }> {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'deals',
    where: { stage: { not_in: ['won', 'lost'] } },
    limit: 500,
    depth: 1, // pulls contact so we get name/company/phone without a second query per row
  })

  const scorable: (ScorableDeal & { contactName: string; contactCompany?: string | null; contactPhoneE164?: string | null; nextAction?: string | null })[] = docs.map((deal) => {
    const contact = typeof deal.contact === 'object' && deal.contact ? deal.contact : null
    return {
      id: deal.id,
      stage: deal.stage,
      awaitingWhom: deal.awaitingWhom,
      deadlineDate: deal.deadlineDate,
      quoteSentAt: deal.quoteSentAt,
      nextActionAt: deal.nextActionAt,
      lastInboundMessageAt: deal.lastInboundMessageAt,
      lastOutboundMessageAt: deal.lastOutboundMessageAt,
      lastMessageAt: deal.lastMessageAt,
      estimatedValue: deal.estimatedValue,
      updatedAt: deal.updatedAt,
      contactName: contact?.name || 'Unknown contact',
      contactCompany: contact?.company,
      contactPhoneE164: contact?.phoneE164,
      nextAction: deal.nextAction,
    }
  })

  const queue = buildQueue(scorable) as QueueRow[]

  const daily = queue.filter((d) => d.bucket !== 'dormant').slice(0, DAILY_CAP)
  const dormant = queue.filter((d) => d.bucket === 'dormant')

  return { daily, dormant, totalOpen: docs.length }
}
