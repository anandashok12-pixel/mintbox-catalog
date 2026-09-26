/**
 * Turns a deal's stored fields into a queue position. This is the whole
 * point of the CRM: buckets first, value only breaks ties within a
 * bucket - a single weighted score would let a large dormant deal
 * outrank someone who asked a question yesterday. See the PRD's
 * "priority queue" section for the reasoning.
 */

export type Bucket =
  | 'waiting_on_you'
  | 'deadline_at_risk'
  | 'quoted_gone_quiet'
  | 'open_no_next_action'
  | 'dormant'

export const BUCKET_ORDER: Bucket[] = [
  'waiting_on_you',
  'deadline_at_risk',
  'quoted_gone_quiet',
  'open_no_next_action',
  'dormant',
]

export const BUCKET_LABELS: Record<Bucket, string> = {
  waiting_on_you: 'Waiting on you',
  deadline_at_risk: 'Deadline at risk',
  quoted_gone_quiet: 'Quoted, gone quiet',
  open_no_next_action: 'Open, no next action',
  dormant: 'Dormant',
}

// How many days out a deadline has to be before it counts as "at risk" -
// a stand-in for "the lead time this occasion needs to deliver", which
// really varies by pack size and customisation. Revisit once there's
// enough won-deal history to calibrate per occasion.
const DEADLINE_RISK_WINDOW_DAYS = 7
const GONE_QUIET_DAYS = 3
const DORMANT_DAYS = 21

export interface ScorableDeal {
  id: string | number
  stage: string
  awaitingWhom?: string | null
  deadlineDate?: string | null
  quoteSentAt?: string | null
  nextActionAt?: string | null
  lastInboundMessageAt?: string | null
  lastOutboundMessageAt?: string | null
  lastMessageAt?: string | null
  estimatedValue?: number | null
  updatedAt: string
}

export interface QueuedDeal extends ScorableDeal {
  bucket: Bucket
  sortValue: number // meaning depends on bucket: hours waiting, days remaining, or value - see assignBucket
}

const daysBetween = (a: Date, b: Date) => (a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24)
const hoursBetween = (a: Date, b: Date) => (a.getTime() - b.getTime()) / (1000 * 60 * 60)

/**
 * Returns null for a deal that shouldn't appear in the queue at all:
 * closed (won/lost), or snoozed into the future via nextActionAt.
 */
export function assignBucket(deal: ScorableDeal, now: Date = new Date()): { bucket: Bucket; sortValue: number } | null {
  if (deal.stage === 'won' || deal.stage === 'lost') return null

  if (deal.nextActionAt && new Date(deal.nextActionAt) > now) return null // snoozed

  const lastActivity = deal.lastMessageAt ? new Date(deal.lastMessageAt) : new Date(deal.updatedAt)

  // 1. Waiting on you - the customer said something and we haven't
  // replied since. This is the bucket the whole mirror exists to feed:
  // without outbound-message capture, "we replied" is unknowable.
  if (deal.awaitingWhom === 'us' && deal.lastInboundMessageAt) {
    const inboundIsNewer =
      !deal.lastOutboundMessageAt || new Date(deal.lastInboundMessageAt) > new Date(deal.lastOutboundMessageAt)
    if (inboundIsNewer) {
      return { bucket: 'waiting_on_you', sortValue: hoursBetween(now, new Date(deal.lastInboundMessageAt)) }
    }
  }

  // 2. Deadline at risk - inside the delivery lead-time window, not yet won.
  if (deal.deadlineDate) {
    const daysRemaining = daysBetween(new Date(deal.deadlineDate), now)
    if (daysRemaining <= DEADLINE_RISK_WINDOW_DAYS) {
      // Sort ascending (soonest first): store as negative so the shared
      // "higher sortValue first" ordering in buildQueue still works.
      return { bucket: 'deadline_at_risk', sortValue: -daysRemaining }
    }
  }

  // 3. Quoted, then silence for 3+ days.
  if (deal.quoteSentAt) {
    const quietDays = daysBetween(now, new Date(deal.quoteSentAt))
    const noReplySinceQuote = !deal.lastInboundMessageAt || new Date(deal.lastInboundMessageAt) < new Date(deal.quoteSentAt)
    if (noReplySinceQuote && quietDays >= GONE_QUIET_DAYS) {
      return { bucket: 'quoted_gone_quiet', sortValue: deal.estimatedValue || 0 }
    }
  }

  // 5. Dormant - checked before bucket 4 so a long-silent deal doesn't
  // masquerade as merely "open with no next action".
  if (daysBetween(now, lastActivity) >= DORMANT_DAYS) {
    return { bucket: 'dormant', sortValue: deal.estimatedValue || 0 }
  }

  // 4. Open, no next action scheduled - the default bucket for an active
  // deal that isn't flagged by any of the above.
  if (!deal.nextActionAt) {
    return { bucket: 'open_no_next_action', sortValue: deal.estimatedValue || 0 }
  }

  return null // has a future-dated next action that's not yet due, and no other flag applies
}

export function buildQueue<T extends ScorableDeal>(deals: T[], now: Date = new Date()): (T & { bucket: Bucket; sortValue: number })[] {
  const scored = deals
    .map((deal) => {
      const result = assignBucket(deal, now)
      return result ? { ...deal, ...result } : null
    })
    .filter((d): d is T & { bucket: Bucket; sortValue: number } => d !== null)

  return scored.sort((a, b) => {
    const bucketDiff = BUCKET_ORDER.indexOf(a.bucket) - BUCKET_ORDER.indexOf(b.bucket)
    if (bucketDiff !== 0) return bucketDiff
    return b.sortValue - a.sortValue // higher first within a bucket
  })
}
