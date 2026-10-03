import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getPayload, type Where } from 'payload'
import configPromise from '@payload-config'
import { getAnthropic } from '@/lib/anthropic'

// Drafts (or rewrites) an email with Claude from the salesperson's
// instructions plus everything we know: the full email history with that
// address, recent WhatsApp messages, and the deal record. Returns a draft
// for the composer; nothing is sent from here.
export const maxDuration = 60
export const dynamic = 'force-dynamic'

const DRAFT_MODEL = 'claude-opus-5-5'

interface DraftBody {
  mailbox: string
  to: string
  subject?: string
  instructions: string
  currentDraft?: string
  contactId?: string | number
  dealId?: string | number
}

const SYSTEM = `You write emails for MintBox (themintbox.in), an Indian corporate gifting company: Diwali and festive hampers, employee welcome kits, client gifts and custom-branded merchandise, sold to HR, admin and procurement teams.

Write like a capable, warm salesperson at a small company: plain, specific and brief. Match the formality of the existing thread. Use Indian conventions (₹, lakh, GST). Never invent prices, stock, delivery dates or product names that are not in the context or the instructions; if a fact is needed but unknown, leave a clear [placeholder] for the salesperson to fill.

End the body with a short sign-off line such as "Warm regards," and nothing after it: the sender's signature is appended automatically, so never write a name, title, phone number or company footer. Plain text only, no markdown.`

const fmtDate = (v?: string | null) => (v ? new Date(v).toISOString().slice(0, 10) : '')

export async function POST(req: NextRequest) {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: req.headers })
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!process.env.ANTHROPIC_API_KEY?.trim()) return NextResponse.json({ error: 'ANTHROPIC_API_KEY is not set' }, { status: 503 })

  let input: DraftBody
  try {
    input = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const instructions = (input.instructions || '').trim()
  if (!instructions && !input.currentDraft?.trim()) {
    return NextResponse.json({ error: 'Tell the AI what the email should say' }, { status: 400 })
  }
  const to = (input.to || '').split(',')[0].trim().toLowerCase()

  // Full email history with this address, across all mailboxes.
  const emailWhere: Where[] = []
  if (to) emailWhere.push({ fromEmail: { equals: to } }, { toEmails: { like: to } }, { ccEmails: { like: to } })
  if (input.contactId) emailWhere.push({ contact: { equals: input.contactId } })
  const emails = emailWhere.length
    ? (await payload.find({ collection: 'messages', where: { and: [{ channel: { equals: 'email' } }, { or: emailWhere }] }, sort: '-sentAt', limit: 30, depth: 0 })).docs.reverse()
    : []

  const contactId = input.contactId ?? (emails[0] ? (typeof emails[0].contact === 'object' ? emails[0].contact.id : emails[0].contact) : undefined)
  const whatsapp = contactId
    ? (await payload.find({ collection: 'messages', where: { and: [{ channel: { equals: 'whatsapp' } }, { contact: { equals: contactId } }] }, sort: '-sentAt', limit: 15, depth: 0 })).docs.reverse()
    : []
  const contact = contactId ? await payload.findByID({ collection: 'contacts', id: contactId, depth: 0 }).catch(() => null) : null
  const deal = input.dealId ? await payload.findByID({ collection: 'deals', id: input.dealId, depth: 0 }).catch(() => null) : null

  const lines: string[] = []
  if (contact) lines.push(`Recipient: ${contact.name}${contact.company ? `, ${contact.company}` : ''} <${contact.email || to}>`)
  else if (to) lines.push(`Recipient: ${to}`)
  if (deal) {
    const unit = deal.unitBudgetMin && deal.unitBudgetMax && deal.unitBudgetMin !== deal.unitBudgetMax
      ? `₹${deal.unitBudgetMin}-${deal.unitBudgetMax}` : deal.unitBudgetMax || deal.unitBudgetMin ? `₹${deal.unitBudgetMax || deal.unitBudgetMin}` : ''
    lines.push(
      '',
      '<deal>',
      `Title: ${deal.title}`,
      `Stage: ${deal.stage}`,
      deal.occasion ? `Occasion: ${deal.occasion}` : '',
      deal.quantity ? `Quantity: ${deal.quantity}` : '',
      unit ? `Budget per hamper: ${unit}` : '',
      deal.estimatedValue ? `Estimated total: ₹${deal.estimatedValue}` : '',
      deal.deadlineDate ? `Deadline: ${fmtDate(deal.deadlineDate)}` : '',
      deal.productInterest?.length ? `Products discussed: ${deal.productInterest.map((p: { label?: string | null }) => p.label).filter(Boolean).join(', ')}` : '',
      deal.summary ? `Situation: ${deal.summary}` : '',
      deal.remarks ? `Salesperson's notes: ${deal.remarks}` : '',
      '</deal>',
    )
  }
  if (emails.length) {
    lines.push('', '<email_history oldest_first="true">')
    for (const m of emails) {
      lines.push(`--- ${fmtDate(m.sentAt)} ${m.direction === 'inbound' ? `from ${m.fromEmail}` : `we sent (${m.fromEmail})`} | Subject: ${m.subject || ''}`, (m.body || '').slice(0, 3000))
    }
    lines.push('</email_history>')
  }
  if (whatsapp.length) {
    lines.push('', '<whatsapp_history oldest_first="true">')
    for (const m of whatsapp) lines.push(`${fmtDate(m.sentAt)} ${m.direction === 'inbound' ? 'Them' : 'Us'}: ${(m.body || m.preview || '').slice(0, 800)}`)
    lines.push('</whatsapp_history>')
  }
  lines.push('', `Sending from: ${input.mailbox}`)
  if (input.subject?.trim()) lines.push(`Current subject: ${input.subject.trim()}`)
  if (input.currentDraft?.trim()) lines.push('', '<current_draft>', input.currentDraft.trim(), '</current_draft>')
  lines.push('', input.currentDraft?.trim()
    ? `Rewrite the current draft following these instructions: ${instructions || 'tighten and improve it'}`
    : `Write the email. Instructions: ${instructions}`)

  try {
    const response = await getAnthropic().beta.messages.create({
      model: DRAFT_MODEL,
      max_tokens: 16000,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: {
        effort: 'medium',
        format: {
          type: 'json_schema',
          schema: {
            type: 'object',
            properties: {
              subject: { type: 'string', description: 'Email subject line. Keep the existing subject for replies.' },
              body: { type: 'string', description: 'Plain-text email body ending with the sign-off line, no signature.' },
            },
            required: ['subject', 'body'],
            additionalProperties: false,
          },
        },
      },
      system: SYSTEM,
      messages: [{ role: 'user', content: lines.filter((l) => l !== '').join('\n') }],
    })

    if (response.stop_reason === 'refusal') return NextResponse.json({ error: 'The AI declined to draft this email' }, { status: 422 })
    if (response.stop_reason === 'max_tokens') return NextResponse.json({ error: 'The draft was cut off; try shorter instructions' }, { status: 502 })
    const text = response.content.find((b) => b.type === 'text')
    if (!text || text.type !== 'text') return NextResponse.json({ error: 'The AI returned no draft' }, { status: 502 })
    const draft = JSON.parse(text.text) as { subject: string; body: string }
    return NextResponse.json({ subject: draft.subject, body: draft.body })
  } catch (err) {
    payload.logger.error({ err }, 'Email draft failed')
    const message = err instanceof Anthropic.APIError ? `AI error ${err.status}: ${err.message}` : err instanceof Error ? err.message : 'Draft failed'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
