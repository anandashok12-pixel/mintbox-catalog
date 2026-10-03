import type { Bucket, Deal, ScoredDeal } from './types'

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

const DAY = 86_400_000

export function scoreDeal(deal: Deal, now = new Date()): { bucket: Bucket; sortValue: number } | null {
  if (deal.stage === 'won' || deal.stage === 'lost') return null
  if (deal.nextActionAt && new Date(deal.nextActionAt) > now) return null

  const lastActivity = new Date(deal.lastMessageAt || deal.updatedAt)

  if (deal.awaitingWhom === 'us' && deal.lastInboundMessageAt) {
    const inboundIsNewer = !deal.lastOutboundMessageAt || new Date(deal.lastInboundMessageAt) > new Date(deal.lastOutboundMessageAt)
    if (inboundIsNewer) {
      return { bucket: 'waiting_on_you', sortValue: (now.getTime() - new Date(deal.lastInboundMessageAt).getTime()) / 3_600_000 }
    }
  }

  if (deal.deadlineDate) {
    const daysRemaining = (new Date(deal.deadlineDate).getTime() - now.getTime()) / DAY
    if (daysRemaining <= 7) return { bucket: 'deadline_at_risk', sortValue: -daysRemaining }
  }

  if (deal.quoteSentAt) {
    const quietDays = (now.getTime() - new Date(deal.quoteSentAt).getTime()) / DAY
    const noReplySinceQuote = !deal.lastInboundMessageAt || new Date(deal.lastInboundMessageAt) < new Date(deal.quoteSentAt)
    if (noReplySinceQuote && quietDays >= 3) {
      return { bucket: 'quoted_gone_quiet', sortValue: deal.estimatedValue || 0 }
    }
  }

  if ((now.getTime() - lastActivity.getTime()) / DAY >= 21) {
    return { bucket: 'dormant', sortValue: deal.estimatedValue || 0 }
  }

  if (!deal.nextActionAt) {
    return { bucket: 'open_no_next_action', sortValue: deal.estimatedValue || 0 }
  }

  return null
}

export function buildQueue(deals: Deal[], now = new Date()): ScoredDeal[] {
  return deals
    .map((deal) => {
      const score = scoreDeal(deal, now)
      return score ? { ...deal, ...score } : null
    })
    .filter((deal): deal is ScoredDeal => deal !== null)
    .sort((a, b) => {
      const bucketDifference = BUCKET_ORDER.indexOf(a.bucket) - BUCKET_ORDER.indexOf(b.bucket)
      return bucketDifference || b.sortValue - a.sortValue
    })
}

export function queueReason(deal: ScoredDeal): string {
  switch (deal.bucket) {
    case 'waiting_on_you': {
      const hours = Math.max(0, Math.round(deal.sortValue))
      return hours < 48 ? `${hours}h waiting` : `${Math.round(hours / 24)} days waiting`
    }
    case 'deadline_at_risk': return `${Math.round(-deal.sortValue)}d to deadline`
    case 'quoted_gone_quiet': return 'No reply after quote'
    case 'dormant': return 'Silent for 21+ days'
    default: return 'Nothing scheduled'
  }
}
