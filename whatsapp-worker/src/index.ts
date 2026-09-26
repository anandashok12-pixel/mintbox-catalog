// See authState.ts for why this is a default-import + runtime destructure
// rather than named imports - Baileys is CJS-only, so Node's native ESM
// loader hands us the whole `module.exports` object as the default import
// (not just the makeWASocket function), and can't statically resolve
// named exports reliably at all.
import baileysPkg from '@whiskeysockets/baileys'
import type { WASocket } from '@whiskeysockets/baileys'
const { makeWASocket, DisconnectReason, fetchLatestBaileysVersion, Browsers, downloadMediaMessage } = baileysPkg as any
import { Boom } from '@hapi/boom'
import pino from 'pino'
import QRCode from 'qrcode'
import { usePostgresAuthState, clearAuthState } from './authState.js'
import { postToWebhook } from './webhook.js'
import { extractMessageContent } from './extract.js'

const SESSION_ID = process.env.WHATSAPP_SESSION_ID || 'mintbox-main'
const HEARTBEAT_INTERVAL_MS = 60_000
const MAX_RECONNECT_DELAY_MS = 30_000

const logger = pino({ level: process.env.LOG_LEVEL || 'info' })

let reconnectAttempts = 0
let heartbeatTimer: ReturnType<typeof setInterval> | undefined

function startHeartbeat() {
  if (heartbeatTimer) clearInterval(heartbeatTimer)
  // Proves the process itself is alive, independent of connection state -
  // a stuck reconnect loop still needs to be visible as "worker is dead"
  // rather than silently retrying forever with nobody told.
  heartbeatTimer = setInterval(() => {
    postToWebhook({ type: 'heartbeat' }).catch((err) => logger.error({ err }, 'heartbeat post failed'))
  }, HEARTBEAT_INTERVAL_MS)
}

async function connect(): Promise<void> {
  const { state, saveCreds } = await usePostgresAuthState(SESSION_ID)
  const { version } = await fetchLatestBaileysVersion()
  // Captured before this attempt touches the socket: distinguishes "an
  // already-paired session dropped" (worth retrying) from "registration/
  // pairing itself failed" (WhatsApp's abuse detection territory - retrying
  // automatically just burns more attempts on the same signal, see PRD).
  const wasRegisteredBeforeThisAttempt = state.creds?.registered === true

  const sock: WASocket = makeWASocket({
    auth: state,
    version,
    logger,
    browser: Browsers.macOS('Desktop'),

    // --- Read-only posture. Every one of these matters (see the PRD). ---
    // Marking online steals notification delivery from the phone app -
    // the one thing this whole mirror exists not to break.
    markOnlineOnConnect: false,
    // Best-effort request for more than the default recent-message slice
    // at link time. Not guaranteed by WhatsApp, but costs nothing to ask.
    syncFullHistory: true,
    // Never emit read receipts or typing/presence from here - see below,
    // this socket never calls readMessages() or sendPresenceUpdate().
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update

    if (qr) {
      try {
        const qrDataUrl = await QRCode.toDataURL(qr)
        await postToWebhook({ type: 'qr', qrDataUrl })
        logger.info('QR code generated and posted to CRM - scan it from WhatsApp > Linked Devices')
      } catch (err) {
        logger.error({ err }, 'failed to render/post QR code')
      }
    }

    if (connection === 'open') {
      reconnectAttempts = 0
      logger.info('WhatsApp connection open')
      await postToWebhook({ type: 'connection', status: 'connected' })
    }

    if (connection === 'connecting') {
      await postToWebhook({ type: 'connection', status: 'connecting' })
    }

    if (connection === 'close') {
      const statusCode = (lastDisconnect?.error as Boom | undefined)?.output?.statusCode
      const loggedOut = statusCode === DisconnectReason.loggedOut

      if (loggedOut) {
        // This auth state can never reconnect. Wipe it so the next start
        // generates a fresh pairing QR rather than looping on a dead session.
        logger.warn('Logged out - clearing session, a fresh QR scan is required')
        await clearAuthState(SESSION_ID)
        await postToWebhook({ type: 'connection', status: 'logged_out', reason: String(lastDisconnect?.error) })
        return // do not reconnect automatically after a logout
      }

      await postToWebhook({ type: 'connection', status: 'disconnected', reason: String(lastDisconnect?.error) })

      if (!wasRegisteredBeforeThisAttempt) {
        // Never auto-retry a failed pairing attempt - that's what turned one
        // bad attempt into a burst of them before. Surface it and stop; a
        // human restarts the worker for the next single clean attempt.
        logger.error(
          `Registration attempt failed (status ${statusCode}) before pairing completed. Not auto-retrying - restart the worker manually for another one-shot attempt.`,
        )
        return
      }

      reconnectAttempts += 1
      const delay = Math.min(MAX_RECONNECT_DELAY_MS, 1000 * 2 ** reconnectAttempts)
      logger.warn(`Connection closed (status ${statusCode}). Reconnecting in ${delay}ms (attempt ${reconnectAttempts})`)
      setTimeout(() => {
        connect().catch((err) => logger.error({ err }, 'reconnect failed'))
      }, delay)
    }
  })

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    // 'notify' = a live message just arrived/was sent. History-sync batches
    // arrive with other types and are handled by Baileys' own sync events -
    // this handler only needs the live stream.
    if (type !== 'notify') return

    for (const msg of messages) {
      const jid = msg.key?.remoteJid
      if (!jid) continue

      // Never mirror group chats or broadcast/status - out of scope for a
      // 1:1 sales mirror, and explicitly excluded by the PRD.
      if (jid.includes('@g.us') || jid.includes('broadcast') || jid === 'status@broadcast') continue

      if (!msg.message) continue // protocol messages, reactions-only, etc. - nothing to extract

      const content = extractMessageContent(msg.message)
      if (!content.text && !content.hasMedia) continue

      const providerId = msg.key.id
      if (!providerId) continue

      const timestampSeconds = typeof msg.messageTimestamp === 'number' ? msg.messageTimestamp : Number(msg.messageTimestamp)
      const sentAt = new Date(timestampSeconds * 1000).toISOString()

      let media: { base64: string; mimeType: string; filename: string } | undefined
      if (content.hasMedia) {
        try {
          const buffer = (await downloadMediaMessage(msg, 'buffer', {}, { logger, reuploadRequest: sock.updateMediaMessage })) as Buffer
          media = { base64: buffer.toString('base64'), mimeType: content.mimeType!, filename: content.filename! }
        } catch (err) {
          logger.warn({ err, providerId }, 'media download failed - storing message text only, if any')
        }
      }

      await postToWebhook({
        type: 'message',
        providerId,
        jid,
        fromMe: !!msg.key.fromMe,
        pushName: msg.pushName || undefined,
        text: content.text,
        sentAt,
        media,
      })
    }
  })

  // Deliberately absent, by design (read-only posture):
  //   sock.readMessages(...)        - would mark chats read on the phone, hiding unread state
  //   sock.sendPresenceUpdate(...)  - would broadcast online/typing status
  // This socket only listens.
}

startHeartbeat()
connect().catch((err) => {
  logger.error({ err }, 'initial connect failed')
  process.exit(1)
})

process.on('SIGTERM', () => process.exit(0))
process.on('SIGINT', () => process.exit(0))
