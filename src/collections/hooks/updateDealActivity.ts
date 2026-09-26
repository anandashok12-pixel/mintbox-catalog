import type { CollectionAfterChangeHook } from 'payload'

/**
 * Keeps a deal's activity timestamps current whenever a message lands
 * against it, so the queue and the "waiting on you" bucket never need to
 * join across Messages at read time. Only touches deals that already have
 * a `deal` link on the message - a message on a contact with no deal yet
 * (e.g. a WhatsApp message from a brand-new number before any lead/deal
 * exists) has nothing to update here.
 */
export const updateDealActivity: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc
  if (!doc.deal) return doc

  const sentAt = doc.sentAt || new Date().toISOString()
  const data: Record<string, unknown> = { lastMessageAt: sentAt }

  if (doc.direction === 'inbound') {
    data.lastInboundMessageAt = sentAt
  } else if (doc.direction === 'outbound') {
    data.lastOutboundMessageAt = sentAt
  }

  await req.payload.update({
    collection: 'deals',
    id: typeof doc.deal === 'object' ? doc.deal.id : doc.deal,
    data,
  })

  return doc
}
