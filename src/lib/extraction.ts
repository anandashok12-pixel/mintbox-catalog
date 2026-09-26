import { z } from 'zod'
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getAnthropic, EXTRACTION_MODEL } from './anthropic'
import { DEAL_STAGES } from '@/collections/Deals'

/**
 * Turns raw messages into the structured deal fields the queue scores on.
 * This is an INCREMENTAL pass: it reads only messages since lastExtractedAt,
 * plus the deal's currently-stored fields as context, and returns updates -
 * not a full restatement. See the "merge, don't overwrite" note below for
 * why that matters.
 *
 * Two rules that matter more than the schema itself (see the PRD):
 *   1. Every number must cite the new message it came from. A citation that
 *      doesn't match an id in this batch is discarded, not trusted.
 *   2. Extraction proposes, it never decides: this writes suggestedStage,
 *      never stage, and never touches won/lost.
 */

const OCCASION_VALUES = [
  'welcome_kit', 'diwali', 'holi', 'corporate_event',
  'client_gifting', 'festival', 'year_end', 'other',
] as const

const STAGE_VALUES = DEAL_STAGES.map((s) => s.value) as [string, ...string[]]

const ExtractionSchema = z.object({
  quantityUpdate: z
    .object({ value: z.number().int().positive(), sourceMessageId: z.string() })
    .nullable()
    .describe('Only set if a NEW message in this batch establishes or changes the quantity. Null if nothing new says so.'),
  unitBudgetMinUpdate: z
    .object({ value: z.number().positive(), sourceMessageId: z.string() })
    .nullable()
    .describe('Per-unit budget lower bound in INR, only if a new message states one.'),
  unitBudgetMaxUpdate: z
    .object({ value: z.number().positive(), sourceMessageId: z.string() })
    .nullable()
    .describe('Per-unit budget upper bound in INR, only if a new message states one.'),
  occasionUpdate: z.enum(OCCASION_VALUES).nullable().describe('Only if a new message reveals/changes the occasion.'),
  deadlineDateUpdate: z
    .string()
    .nullable()
    .describe('ISO 8601 date (YYYY-MM-DD), only if a new message states or changes a delivery deadline. Resolve relative/festival phrases ("before Diwali", "next Friday") against the given current date.'),
  newProductInterest: z.array(z.string()).describe('Products/categories newly mentioned in this batch. Empty array if none.'),
  newBlockers: z.array(z.string()).describe('New things the customer is waiting on, newly apparent in this batch. Empty array if none.'),
  summary: z.string().describe('3 lines max, for someone picking the thread up cold. Reflects the FULL deal to date, not just this batch.'),
  nextAction: z.string().nullable().describe('The single concrete next thing to do. Null if genuinely nothing to do right now.'),
  awaitingWhom: z.enum(['us', 'them', 'nobody']).describe('Who the deal is currently waiting on, based on the most recent message.'),
  suggestedStage: z.enum(STAGE_VALUES).describe('Proposed stage. Never won/lost - those are human calls only.'),
})

export type ExtractionResult = z.infer<typeof ExtractionSchema>

interface ContextMessage {
  id: string | number
  direction: string
  sentAt: string
  body?: string | null
}

function buildPrompt(args: {
  today: string
  knownState: Record<string, unknown>
  newMessages: ContextMessage[]
}): string {
  const messagesBlock = args.newMessages
    .map((m) => `[id=${m.id}] (${m.direction}, ${m.sentAt}): ${m.body || '(no text - media or empty message)'}`)
    .join('\n')

  return `Today's date is ${args.today}.

Known so far about this deal (from prior form data and earlier messages):
${JSON.stringify(args.knownState, null, 2)}

New messages since the last check (cite the [id=...] tag exactly when a number or date comes from one of these):
${messagesBlock}

Extract updates for a gifting/corporate-gifts sales deal. Only fill an "Update" field when a message in THIS batch actually establishes or changes that fact - leave it null otherwise. Never invent a number that isn't stated. summary, nextAction, awaitingWhom and suggestedStage should reflect the deal's full current state (known-so-far plus these new messages), not just this batch.`
}

async function runExtraction(prompt: string): Promise<ExtractionResult | null> {
  const client = getAnthropic()
  const response = await client.messages.parse({
    model: EXTRACTION_MODEL,
    max_tokens: 4096,
    output_config: { format: zodOutputFormat(ExtractionSchema) },
    messages: [{ role: 'user', content: prompt }],
  })
  return response.parsed_output
}

export async function extractDealContext(
  dealId: string | number,
  // Test-only: bypasses the live model call so the merge/citation logic
  // can be verified deterministically without spending on the API.
  testOverride?: ExtractionResult,
): Promise<{ skipped: string } | { updated: true }> {
  const payload = await getPayload({ config: configPromise })

  const deal = await payload.findByID({ collection: 'deals', id: dealId, depth: 0 })
  if (!deal) return { skipped: 'deal_not_found' }
  if (deal.stage === 'won' || deal.stage === 'lost') return { skipped: 'deal_closed' }

  const since = deal.lastExtractedAt
  const messagesResult = await payload.find({
    collection: 'messages',
    where: {
      and: [
        { deal: { equals: dealId } },
        ...(since ? [{ createdAt: { greater_than: since } }] : []),
      ],
    },
    sort: 'sentAt',
    limit: 100,
    depth: 0,
  })

  if (messagesResult.docs.length === 0) return { skipped: 'no_new_messages' }

  const newMessages: ContextMessage[] = messagesResult.docs.map((m) => ({
    id: m.id,
    direction: m.direction,
    sentAt: m.sentAt,
    body: m.body,
  }))
  const validMessageIds = new Set(newMessages.map((m) => String(m.id)))

  const knownState = {
    quantity: deal.quantity ?? null,
    unitBudgetMin: deal.unitBudgetMin ?? null,
    unitBudgetMax: deal.unitBudgetMax ?? null,
    occasion: deal.occasion ?? null,
    deadlineDate: deal.deadlineDate ?? null,
    productInterest: (deal.productInterest || []).map((p: { label?: string | null }) => p.label).filter(Boolean),
    blockers: (deal.blockers || []).map((b: { label?: string | null }) => b.label).filter(Boolean),
    priorSummary: deal.summary ?? null,
  }

  const prompt = buildPrompt({
    today: new Date().toISOString().slice(0, 10),
    knownState,
    newMessages,
  })

  const result = testOverride ?? (await runExtraction(prompt))
  if (!result) return { skipped: 'extraction_parse_failed' }

  // Citation gate: a number whose sourceMessageId isn't one we actually sent
  // is discarded outright, not trusted with a lower confidence - a
  // hallucinated citation is exactly as dangerous as a hallucinated number.
  const quantity = result.quantityUpdate && validMessageIds.has(result.quantityUpdate.sourceMessageId) ? result.quantityUpdate.value : undefined
  const unitBudgetMin = result.unitBudgetMinUpdate && validMessageIds.has(result.unitBudgetMinUpdate.sourceMessageId) ? result.unitBudgetMinUpdate.value : undefined
  const unitBudgetMax = result.unitBudgetMaxUpdate && validMessageIds.has(result.unitBudgetMaxUpdate.sourceMessageId) ? result.unitBudgetMaxUpdate.value : undefined

  const mergedProductInterest = Array.from(new Set([...knownState.productInterest, ...result.newProductInterest])).map((label) => ({ label }))
  const mergedBlockers = Array.from(new Set([...knownState.blockers, ...result.newBlockers])).map((label) => ({ label }))

  const finalQuantity = quantity ?? deal.quantity ?? undefined
  const finalBudgetMin = unitBudgetMin ?? deal.unitBudgetMin ?? undefined
  const finalBudgetMax = unitBudgetMax ?? deal.unitBudgetMax ?? undefined

  let estimatedValue = deal.estimatedValue
  let estimatedValueConfidence = deal.estimatedValueConfidence
  if (finalQuantity && (finalBudgetMin || finalBudgetMax)) {
    const midpoint = finalBudgetMin && finalBudgetMax ? (finalBudgetMin + finalBudgetMax) / 2 : finalBudgetMin || finalBudgetMax || 0
    estimatedValue = finalQuantity * midpoint
    estimatedValueConfidence = 'high'
  }

  await payload.update({
    collection: 'deals',
    id: dealId,
    data: {
      ...(quantity !== undefined ? { quantity } : {}),
      ...(unitBudgetMin !== undefined ? { unitBudgetMin } : {}),
      ...(unitBudgetMax !== undefined ? { unitBudgetMax } : {}),
      ...(result.occasionUpdate ? { occasion: result.occasionUpdate } : {}),
      ...(result.deadlineDateUpdate ? { deadlineDate: result.deadlineDateUpdate } : {}),
      productInterest: mergedProductInterest,
      blockers: mergedBlockers,
      summary: result.summary,
      // Pass null through (not undefined): unlike quantity/budget, nextAction
      // is a current-state snapshot, not an accumulated fact, so the model
      // saying "nothing to do" should actually clear a stale one.
      nextAction: result.nextAction,
      awaitingWhom: result.awaitingWhom,
      suggestedStage: result.suggestedStage,
      estimatedValue,
      estimatedValueConfidence,
      lastExtractedAt: new Date().toISOString(),
    },
  })

  return { updated: true }
}
