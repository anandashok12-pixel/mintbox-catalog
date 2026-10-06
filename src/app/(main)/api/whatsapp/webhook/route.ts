import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import crypto from 'crypto'
import { normalizeJid } from '@/lib/phone'

// The Baileys worker runs on its own always-on host, never on Vercel (it
// holds a long-lived socket). This is the one boundary between it and the
// app: every event - QR, connection status, heartbeat, a message - arrives
// here as a signed POST. Nothing on this route ever sends a WhatsApp
// message; it only records what the worker observed.
export const maxDuration = 60
export const dynamic = 'force-dynamic'

interface QrEvent {
  type: 'qr'
  qrDataUrl: string // data:image/png;base64,...
}

interface ConnectionEvent {
  type: 'connection'
  status: 'connecting' | 'connected' | 'disconnected' | 'logged_out'
  reason?: string
}

interface HeartbeatEvent {
  type: 'heartbeat'
}

interface MessageEvent {
  type: 'message'
  providerId: string
  jid: string // the raw WhatsApp JID, e.g. "919886537631@s.whatsapp.net"
  fromMe: boolean
  pushName?: string
  text?: string
  sentAt: string // ISO
  media?: {
    base64: string
    mimeType: string
    filename: string
  }
}

type WebhookEvent = QrEvent | ConnectionEvent | HeartbeatEvent | MessageEvent

function verifySignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.WHATSAPP_WEBHOOK_SECRET
  if (!secret) {
    // Fail closed: an unconfigured secret must never be treated as "no
    // verification needed" - that would let anyone post fake messages.
    return false
  }
  if (!signature) return false
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
  // Constant-time compare, and guard the length check itself against timing
  // (timingSafeEqual throws on mismatched lengths rather than failing safe).
  const expectedBuf = Buffer.from(expected, 'hex')
  const givenBuf = Buffer.from(signature, 'hex')
  if (expectedBuf.length !== givenBuf.length) return false
  return crypto.timingSafeEqual(expectedBuf, givenBuf)
}

function base64ToBuffer(base64: string): Buffer {
  return Buffer.from(base64, 'base64')
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-mintbox-signature')

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let event: WebhookEvent
  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })

  try {
    switch (event.type) {
      case 'qr': {
        const buffer = base64ToBuffer(event.qrDataUrl.replace(/^data:image\/png;base64,/, ''))
        const media = await payload.create({
          collection: 'media',
          data: { alt: 'WhatsApp pairing QR' },
          file: { data: buffer, mimetype: 'image/png', name: `whatsapp-qr-${Date.now()}.png`, size: buffer.length },
        })
        await payload.updateGlobal({
          slug: 'whatsapp-session',
          data: { status: 'needs_qr', qrMedia: media.id, qrGeneratedAt: new Date().toISOString() },
        })
        return NextResponse.json({ success: true })
      }

      case 'connection': {
        const statusMap = {
          connecting: 'connecting',
          connected: 'connected',
          disconnected: 'disconnected',
          logged_out: 'logged_out',
        } as const
        await payload.updateGlobal({
          slug: 'whatsapp-session',
          data: {
            status: statusMap[event.status],
            lastConnectionEventAt: new Date().toISOString(),
            lastError: event.reason || null,
          },
        })
        return NextResponse.json({ success: true })
      }

      case 'heartbeat': {
        await payload.updateGlobal({
          slug: 'whatsapp-session',
          data: { lastHeartbeatAt: new Date().toISOString() },
        })
        return NextResponse.json({ success: true })
      }

      case 'message': {
        // Defense in depth: the worker is configured to skip @g.us and
        // @broadcast, but never trust a client's filtering alone.
        if (event.jid.includes('@g.us') || event.jid.includes('broadcast')) {
          return NextResponse.json({ success: true, skipped: 'group_or_broadcast' })
        }

        // Idempotent on providerId - retries from the worker (reconnects,
        // at-least-once delivery) must never create duplicate messages.
        const existingMessage = await payload.find({
          collection: 'messages',
          where: { providerId: { equals: event.providerId } },
          limit: 1,
          depth: 0,
        })
        if (existingMessage.docs.length > 0) {
          return NextResponse.json({ success: true, skipped: 'duplicate' })
        }

        // A LID ("123@lid") is WhatsApp's private chat id, not a phone number;
        // the worker resolves these, so one arriving here is skipped rather
        // than saved as a fake number.
        if (!/@(s\.whatsapp\.net|c\.us|lid)$/.test(event.jid)) {
          return NextResponse.json({ success: true, skipped: 'not_a_personal_chat' })
        }
        if (event.jid.endsWith('@lid')) {
          payload.logger.warn(`WhatsApp message ${event.providerId} arrived with an unresolved LID: ${event.jid}`)
          return NextResponse.json({ success: true, skipped: 'unresolved_lid' })
        }
        // On our own outgoing messages pushName is our name, never the customer's.
        if (event.fromMe) event.pushName = undefined

        const phoneE164 = normalizeJid(event.jid)
        if (!phoneE164) {
          payload.logger.warn(`WhatsApp message ${event.providerId} has an unparseable JID: ${event.jid}`)
          return NextResponse.json({ success: true, skipped: 'unparseable_jid' })
        }

        // Upsert the contact. pushName never overwrites a name that came
        // from a form or a manual edit - only a name that itself came from
        // WhatsApp gets refreshed by a newer pushName.
        const existingContact = await payload.find({
          collection: 'contacts',
          where: { phoneE164: { equals: phoneE164 } },
          limit: 1,
          depth: 0,
        })

        let contactId: string | number
        if (existingContact.docs.length > 0) {
          const contact = existingContact.docs[0]
          contactId = contact.id
          const canUpdateName = contact.nameSource === 'whatsapp' && event.pushName
          await payload.update({
            collection: 'contacts',
            id: contactId,
            data: {
              ...(canUpdateName ? { name: event.pushName } : {}),
              lastActivityAt: event.sentAt,
            },
          })
        } else {
          const created = await payload.create({
            collection: 'contacts',
            data: {
              name: event.pushName || phoneE164,
              phoneE164,
              nameSource: 'whatsapp',
              lastActivityAt: event.sentAt,
            },
          })
          contactId = created.id
        }

        // Media, if present: decrypted by the worker (it holds the keys),
        // sent here as base64, stored as an ordinary Payload media doc.
        let mediaIds: (string | number)[] = []
        if (event.media) {
          const buffer = base64ToBuffer(event.media.base64)
          const mediaDoc = await payload.create({
            collection: 'media',
            data: { alt: 'WhatsApp media' },
            file: { data: buffer, mimetype: event.media.mimeType, name: event.media.filename, size: buffer.length },
          })
          mediaIds = [mediaDoc.id]
        }

        // A contact can have several deals (repeat enquiries, different
        // occasions). A raw chat message has no explicit deal reference, so
        // attach it to whichever open deal was touched most recently - a
        // reasonable default that keeps the queue's activity timestamps
        // current for the common case. Two genuinely simultaneous open
        // enquiries with the same contact is the one case this gets wrong,
        // and it's a manual-merge situation either way (see the PRD).
        //
        // A chat someone tagged in the CRM wins over that guess while its deal
        // is open - including a supplier's chat filed under a customer deal,
        // whose contact would otherwise never match.
        const lastTagged = await payload.find({
          collection: 'messages',
          where: { and: [{ contact: { equals: contactId } }, { channel: { equals: 'whatsapp' } }, { deal: { exists: true } }] },
          sort: '-sentAt',
          limit: 1,
          depth: 1,
        })
        const taggedDeal = lastTagged.docs[0]?.deal
        let dealId = taggedDeal && typeof taggedDeal === 'object' && !['won', 'lost'].includes(taggedDeal.stage || '')
          ? taggedDeal.id
          : undefined
        if (!dealId) {
          const activeDeal = await payload.find({
            collection: 'deals',
            where: { and: [{ contact: { equals: contactId } }, { stage: { not_in: ['won', 'lost'] } }] },
            sort: '-updatedAt',
            limit: 1,
            depth: 0,
          })
          dealId = activeDeal.docs[0]?.id
        }

        // No automatic deals: a chat with no open deal is stored against the
        // contact only. Friends, vendors and past customers write to this
        // number too, so a person decides with "Turn into deal" in the CRM.

        await payload.create({
          collection: 'messages',
          data: {
            contact: contactId,
            deal: dealId,
            channel: 'whatsapp',
            direction: event.fromMe ? 'outbound' : 'inbound',
            body: event.text || undefined,
            media: mediaIds,
            providerId: event.providerId,
            sentAt: event.sentAt,
          },
        })

        return NextResponse.json({ success: true })
      }

      default:
        return NextResponse.json({ error: 'Unknown event type' }, { status: 400 })
    }
  } catch (error) {
    payload.logger.error({ err: error }, 'WhatsApp webhook processing failed')
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}
