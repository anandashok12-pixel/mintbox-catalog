import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getAnthropic, EXTRACTION_MODEL } from './anthropic'

/**
 * Once-nightly recap, distinct from the 5-minute extraction pass in
 * extraction.ts: that one writes a terse ≤3-line `summary` used for
 * scoring/queueing. This writes a longer bulleted `nightlySummary` meant to
 * read like a briefing - covers WhatsApp + the salesperson's own `remarks`.
 * Email isn't wired in yet; once it is, fold it into buildPrompt() below.
 */

export interface NightlySummarySweepResult {
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

interface ContextMessage {
  direction: string
  sentAt: string
  body?: string | null
}

function buildPrompt(args: { contactLabel: string; remarks: string | null; messages: ContextMessage[] }): string {
  const messagesBlock = args.messages.length
    ? args.messages.map((m) => `(${m.direction}, ${m.sentAt}): ${m.body || '(no text - media or empty message)'}`).join('\n')
    : '(no WhatsApp messages yet)'

  return `Summarise this corporate-gifting sales deal with ${args.contactLabel} for someone picking it up cold tomorrow morning.

WhatsApp conversation history:
${messagesBlock}

Salesperson's own remarks/notes:
${args.remarks || '(none)'}

Write a bulleted summary: one bullet per line, each starting with "- ". At least 2 bullets, at most 20. Cover what they want, where things currently stand, what's blocking progress, and anything promised to them. Only state what's actually in the material above - never invent a detail.`
}

export async function summariseDeal(
  dealId: string | number,
  // Test-only: bypasses the live model call.
  testOverride?: string,
): Promise<{ skipped: string } | { updated: true }> {
  const payload = await getPayload({ config: configPromise })
  const deal = await payload.findByID({ collection: 'deals', id: dealId, depth: 1 })
  if (!deal) return { skipped: 'deal_not_found' }

  const messagesResult = await payload.find({
    collection: 'messages',
    where: {
      and: [
        { deal: { equals: dealId } },
        { channel: { equals: 'whatsapp' } },
      ],
    },
    sort: 'sentAt',
    limit: 300,
    depth: 0,
  })

  if (messagesResult.docs.length === 0 && !deal.remarks) return { skipped: 'nothing_to_summarise' }

  const contact = deal.contact && typeof deal.contact === 'object' ? deal.contact : null
  const contactLabel = contact?.company || contact?.name || deal.title

  const prompt = buildPrompt({
    contactLabel,
    remarks: deal.remarks ?? null,
    messages: messagesResult.docs.map((m) => ({ direction: m.direction, sentAt: m.sentAt, body: m.body })),
  })

  let summary: string | null
  if (testOverride !== undefined) {
    summary = testOverride
  } else {
    const client = getAnthropic()
    const response = await client.messages.create({
      model: EXTRACTION_MODEL,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })
    const textBlock = response.content.find((block) => block.type === 'text')
    summary = textBlock && textBlock.type === 'text' ? textBlock.text.trim() : null
  }

  if (!summary) return { skipped: 'summary_generation_failed' }

  await payload.update({
    collection: 'deals',
    id: dealId,
    data: { nightlySummary: summary, nightlySummaryAt: new Date().toISOString() },
  })

  return { updated: true }
}

/**
 * Covers every open deal in one nightly run rather than an incremental
 * "since last time" slice like extraction - the whole point is a fresh daily
 * briefing, and the actual deal count is small enough that a full pass is
 * cheap. Deals never summarised, or summarised longest ago, go first so a
 * run cut short by the duration limit still makes forward progress.
 */
export async function runNightlySummarySweep(maxDeals = 100): Promise<NightlySummarySweepResult> {
  if (!process.env.ANTHROPIC_API_KEY?.trim()) {
    return { candidates: 0, updated: 0, skipped: 0, failed: 0, failures: [], disabledReason: 'missing_anthropic_api_key' }
  }

  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'deals',
    where: { stage: { not_in: ['won', 'lost'] } },
    limit: 500,
    depth: 0,
  })

  const candidates = [...docs]
    .sort((a, b) => {
      const aTime = a.nightlySummaryAt ? new Date(a.nightlySummaryAt as string).getTime() : 0
      const bTime = b.nightlySummaryAt ? new Date(b.nightlySummaryAt as string).getTime() : 0
      return aTime - bTime
    })
    .slice(0, maxDeals)

  let updated = 0
  let skipped = 0
  const failures: NightlySummarySweepResult['failures'] = []

  const pending = [...candidates]
  const workers = Array.from({ length: Math.min(3, pending.length) }, async () => {
    while (pending.length > 0) {
      const deal = pending.shift()
      if (!deal) return
      try {
        const result = await summariseDeal(deal.id)
        if ('updated' in result) updated += 1
        else skipped += 1
      } catch (error) {
        failures.push({ dealId: deal.id, error: errorMessage(error) })
      }
    }
  })

  await Promise.all(workers)

  return { candidates: candidates.length, updated, skipped, failed: failures.length, failures }
}
