import { NextRequest } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

// 1x1 transparent GIF served for the open-tracking pixel. Always returns the
// image, even on error, so a failure here never shows a broken image in the
// customer's inbox.
export const dynamic = 'force-dynamic'

const GIF = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64')
// Scanners fetch images the moment mail is delivered. Anything this soon after
// sending is not a human open.
const IGNORE_WITHIN_MS = 45_000

export async function GET(_req: NextRequest, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params
  const clean = token.replace(/\.gif$/i, '')
  try {
    if (/^[a-f0-9]{16,64}$/.test(clean)) {
      const payload = await getPayload({ config: configPromise })
      const found = await payload.find({
        collection: 'messages',
        where: { trackingToken: { equals: clean } },
        limit: 1,
        depth: 0,
      })
      const msg = found.docs[0]
      if (msg && Date.now() - new Date(msg.sentAt).getTime() > IGNORE_WITHIN_MS) {
        const now = new Date().toISOString()
        await payload.update({
          collection: 'messages',
          id: msg.id,
          data: {
            openedAt: msg.openedAt || now,
            lastOpenedAt: now,
            openCount: (msg.openCount || 0) + 1,
          },
        })
      }
    }
  } catch {
    // swallow: tracking must never break the image response
  }
  return new Response(GIF, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    },
  })
}
