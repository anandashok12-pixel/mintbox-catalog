import type { Payload } from 'payload'

export interface LeadBackfillSummary {
  totalLeads: number
  alreadyLinked: number
  createdDeals: number
  createdContacts: number
  reusedContacts: number
  withoutPhone: number
  failures: { leadId: string | number; referenceCode?: string | null; error: string }[]
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

/**
 * Ensures every historical website lead has one origin-linked CRM deal.
 * Phone is the preferred cross-channel identity; form email is the fallback
 * for older/test rows whose phone could not be normalised.
 */
export async function backfillCrmFromLeads({
  payload,
  write,
  log = () => undefined,
}: {
  payload: Payload
  write: boolean
  log?: (message: string) => void
}): Promise<LeadBackfillSummary> {
  const { docs: leads, totalDocs } = await payload.find({
    collection: 'leads',
    sort: 'createdAt',
    limit: 500,
    depth: 0,
  })

  const summary: LeadBackfillSummary = {
    totalLeads: totalDocs,
    alreadyLinked: 0,
    createdDeals: 0,
    createdContacts: 0,
    reusedContacts: 0,
    withoutPhone: 0,
    failures: [],
  }

  for (const lead of leads) {
    if (!lead.phoneE164) summary.withoutPhone += 1

    try {
      const existingDeal = await payload.find({
        collection: 'deals',
        where: { originLead: { equals: lead.id } },
        limit: 1,
        depth: 0,
      })
      if (existingDeal.docs.length > 0) {
        summary.alreadyLinked += 1
        log(`SKIP  ${lead.referenceCode}: already linked`)
        continue
      }

      log(`${write ? 'WRITE' : 'DRY  '} ${lead.referenceCode}: ${lead.company || lead.name}`)
      if (!write) {
        summary.createdDeals += 1
        continue
      }

      const existingContact = lead.phoneE164
        ? await payload.find({
            collection: 'contacts',
            where: { phoneE164: { equals: lead.phoneE164 } },
            sort: '-updatedAt',
            limit: 1,
            depth: 0,
          })
        : lead.email
          ? await payload.find({
              collection: 'contacts',
              where: { email: { equals: lead.email } },
              sort: '-updatedAt',
              limit: 1,
              depth: 0,
            })
          : null

      let contactId: string | number
      if (existingContact && existingContact.docs.length > 0) {
        const contact = existingContact.docs[0]
        contactId = contact.id
        summary.reusedContacts += 1

        const lastActivityAt = !contact.lastActivityAt || new Date(lead.createdAt) > new Date(contact.lastActivityAt)
          ? lead.createdAt
          : contact.lastActivityAt
        await payload.update({
          collection: 'contacts',
          id: contactId,
          data: contact.nameSource === 'manual'
            ? { lastActivityAt }
            : {
                name: lead.name,
                company: lead.company || contact.company,
                email: lead.email || contact.email,
                nameSource: 'form',
                lastActivityAt,
              },
        })
      } else {
        const contact = await payload.create({
          collection: 'contacts',
          data: {
            name: lead.name,
            company: lead.company,
            ...(lead.phoneE164 ? { phoneE164: lead.phoneE164 } : {}),
            email: lead.email,
            nameSource: 'form',
            lastActivityAt: lead.createdAt,
          },
        })
        contactId = contact.id
        summary.createdContacts += 1
      }

      type LeadItem = { productName?: string; quantity?: number }
      const items: LeadItem[] = Array.isArray(lead.items) ? lead.items : []
      const productInterest = items
        .filter((item) => item.productName)
        .map((item) => ({ label: item.productName as string }))
      const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0) || undefined
      const estimatedValue = typeof lead.estimatedTotal === 'number' && lead.estimatedTotal > 0
        ? lead.estimatedTotal
        : undefined

      const deal = await payload.create({
        collection: 'deals',
        data: {
          title: `${lead.company || lead.name} - ${lead.referenceCode}`,
          contact: contactId,
          stage: 'qualified',
          occasion: lead.occasion || undefined,
          quantity: totalQuantity,
          productInterest,
          estimatedValue,
          estimatedValueConfidence: estimatedValue ? 'high' : 'low',
          summary: lead.notes || undefined,
          source: lead.channel || undefined,
          originLead: lead.id,
          awaitingWhom: 'us',
        },
      })

      await payload.create({
        collection: 'activities',
        data: {
          contact: contactId,
          deal: deal.id,
          type: 'form_submitted',
          summary: `Backfilled from historical lead ${lead.referenceCode} (${lead.occasion || 'no occasion given'})`,
          meta: {
            leadId: lead.id,
            estimatedTotal: lead.estimatedTotal,
            backfilled: true,
            identityFallback: lead.phoneE164 ? 'phone' : 'email',
          },
        },
      })

      summary.createdDeals += 1
    } catch (error) {
      summary.failures.push({
        leadId: lead.id,
        referenceCode: lead.referenceCode,
        error: errorMessage(error),
      })
    }
  }

  return summary
}
