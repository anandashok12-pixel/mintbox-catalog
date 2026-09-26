import crypto from 'crypto'

const WEBHOOK_URL = process.env.CRM_WEBHOOK_URL // e.g. https://themintbox.in/api/whatsapp/webhook
const WEBHOOK_SECRET = process.env.WHATSAPP_WEBHOOK_SECRET

if (!WEBHOOK_URL || !WEBHOOK_SECRET) {
  throw new Error('CRM_WEBHOOK_URL and WHATSAPP_WEBHOOK_SECRET must both be set - see .env.example')
}

/**
 * Posts one event to the CRM. Retries with backoff on network/5xx failure
 * so a brief app deploy or blip doesn't silently drop a message - but never
 * retries forever, since this runs inline in the message handler and a
 * stuck retry loop would back up the whole mirror.
 */
export async function postToWebhook(event: unknown, attempt = 1): Promise<void> {
  const body = JSON.stringify(event)
  const signature = crypto.createHmac('sha256', WEBHOOK_SECRET!).update(body).digest('hex')

  try {
    const res = await fetch(WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-mintbox-signature': signature },
      body,
    })
    if (!res.ok && res.status >= 500 && attempt < 4) {
      await new Promise((r) => setTimeout(r, attempt * 2000))
      return postToWebhook(event, attempt + 1)
    }
    if (!res.ok) {
      console.error(`[webhook] ${(event as any)?.type} failed with ${res.status}: ${await res.text()}`)
    }
  } catch (err) {
    if (attempt < 4) {
      await new Promise((r) => setTimeout(r, attempt * 2000))
      return postToWebhook(event, attempt + 1)
    }
    console.error(`[webhook] ${(event as any)?.type} failed after retries:`, err)
  }
}
