import type { CollectionAfterChangeHook } from 'payload'

/**
 * Turns a new website lead into CRM rows: upserts the contact by phoneE164,
 * creates a deal seeded with everything the form already told us (quantity,
 * value, occasion, source), and logs a form_submitted activity.
 *
 * Runs on create only. Leads with no phoneE164 (pre-migration rows, or the
 * rare submission that slipped past /api/leads' phone requirement) are left
 * to the manual-merge flow in the admin rather than silently skipped.
 */
export const fanOutLeadToCrm: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc
  if (!doc.phoneE164) {
    req.payload.logger.warn(`Lead ${doc.referenceCode} has no phoneE164 - skipping CRM fan-out`)
    return doc
  }

  const { payload } = req

  // 1. Upsert contact by phoneE164.
  const existing = await payload.find({
    collection: 'contacts',
    where: { phoneE164: { equals: doc.phoneE164 } },
    limit: 1,
    depth: 0,
  })

  let contactId: string | number
  if (existing.docs.length > 0) {
    const contact = existing.docs[0]
    contactId = contact.id
    // Form data is authoritative over a WhatsApp pushName, and a later form
    // submission's name/company/email supersede an earlier one's - but never
    // overwrite a manual edit.
    if (contact.nameSource !== 'manual') {
      await payload.update({
        collection: 'contacts',
        id: contactId,
        data: {
          name: doc.name,
          company: doc.company || contact.company,
          email: doc.email || contact.email,
          nameSource: 'form',
          lastActivityAt: new Date().toISOString(),
        },
      })
    } else {
      await payload.update({
        collection: 'contacts',
        id: contactId,
        data: { lastActivityAt: new Date().toISOString() },
      })
    }
  } else {
    const created = await payload.create({
      collection: 'contacts',
      data: {
        name: doc.name,
        company: doc.company,
        phoneE164: doc.phoneE164,
        email: doc.email,
        nameSource: 'form',
        lastActivityAt: new Date().toISOString(),
      },
    })
    contactId = created.id
  }

  // 2. Create the deal, seeded with everything the form already told us.
  // This is the highest-quality signal in the system (a stated quantity and
  // pack, not an inference from chat) so it should not wait on extraction.
  type LeadItem = { productName?: string; quantity?: number; unitPrice?: number }
  const items: LeadItem[] = Array.isArray(doc.items) ? doc.items : []
  const productInterest = items
    .filter((i) => i.productName)
    .map((i) => ({ label: i.productName }))

  const deal = await payload.create({
    collection: 'deals',
    data: {
      title: `${doc.company || doc.name} - ${doc.referenceCode}`,
      contact: contactId,
      stage: 'new',
      occasion: doc.occasion,
      quantity: items.reduce((sum, i) => sum + (i.quantity || 0), 0) || undefined,
      productInterest,
      estimatedValue: typeof doc.estimatedTotal === 'number' ? doc.estimatedTotal : undefined,
      estimatedValueConfidence: typeof doc.estimatedTotal === 'number' && doc.estimatedTotal > 0 ? 'high' : 'low',
      summary: doc.notes || undefined,
      source: doc.channel || undefined,
      originLead: doc.id,
      awaitingWhom: 'us',
    },
  })

  // 3. Log the activity.
  await payload.create({
    collection: 'activities',
    data: {
      contact: contactId,
      deal: deal.id,
      type: 'form_submitted',
      summary: `Form submitted: ${doc.referenceCode} (${doc.occasion || 'no occasion given'})`,
      meta: { leadId: doc.id, estimatedTotal: doc.estimatedTotal },
    },
  })

  return doc
}
