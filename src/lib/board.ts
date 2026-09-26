import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { DEAL_STAGES, LOST_REASONS } from '@/collections/Deals'
import { assignBucket, type ScorableDeal } from './scoring'

export interface BoardCard {
  id: string | number
  title: string
  contactName: string
  contactCompany?: string | null
  estimatedValue?: number | null
  stage: string
  lostReason?: string | null
  stageSetManually?: boolean | null
  suggestedStage?: string | null
  // A short badge reusing the queue's own bucket logic, so the board isn't
  // blind to what the queue already knows - the one deliberate coupling
  // between the two views (see the PRD).
  queueBadge?: string | null
  queueBucket?: string | null
  createdAt: string
}

export interface BoardColumn {
  stage: string
  label: string
  cards: BoardCard[]
  totalValue: number
}

const BUCKET_BADGE: Record<string, string> = {
  waiting_on_you: 'Waiting on you',
  deadline_at_risk: 'Deadline at risk',
  quoted_gone_quiet: 'Gone quiet',
  open_no_next_action: '',
  dormant: 'Dormant',
}

export async function buildBoard(): Promise<{ columns: BoardColumn[]; stages: typeof DEAL_STAGES; lostReasons: typeof LOST_REASONS }> {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'deals',
    limit: 500,
    depth: 1,
    sort: '-updatedAt',
  })

  const columns: BoardColumn[] = DEAL_STAGES.map((s) => ({ stage: s.value, label: s.label, cards: [], totalValue: 0 }))
  const columnByStage = new Map(columns.map((c) => [c.stage, c]))

  for (const deal of docs) {
    const column = columnByStage.get(deal.stage)
    if (!column) continue

    const contact = typeof deal.contact === 'object' && deal.contact ? deal.contact : null

    const scorable: ScorableDeal = {
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
    }
    const bucketResult = assignBucket(scorable)
    const queueBadge = bucketResult ? BUCKET_BADGE[bucketResult.bucket] || null : null

    column.cards.push({
      id: deal.id,
      title: deal.title,
      contactName: contact?.name || 'Unknown contact',
      contactCompany: contact?.company,
      estimatedValue: deal.estimatedValue,
      stage: deal.stage,
      lostReason: deal.lostReason,
      stageSetManually: deal.stageSetManually,
      suggestedStage: deal.suggestedStage,
      queueBadge,
      queueBucket: bucketResult?.bucket || null,
      createdAt: deal.createdAt,
    })
    column.totalValue += deal.estimatedValue || 0
  }

  return { columns, stages: DEAL_STAGES, lostReasons: LOST_REASONS }
}
