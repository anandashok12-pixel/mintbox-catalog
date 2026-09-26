/**
 * One-off: brings every existing website lead into the CRM as a contact +
 * deal, seeded with everything the lead already captured. This is the
 * historical counterpart to fanOutLeadToCrm.ts (which only runs on new
 * leads going forward) - existing leads never passed through that hook.
 *
 * Every backfilled deal starts at stage 'qualified' per the request (these
 * are known real enquiries, not brand-new/unscreened ones), not the 'new'
 * stage a fresh form submission gets.
 *
 * Idempotent: a lead that already has a deal (via originLead) is skipped,
 * so this is safe to re-run. Leads with no usable phoneE164 are skipped -
 * phoneE164 is the join key the whole CRM is built on, and most of these
 * are pre-launch test submissions with junk numbers (see the earlier
 * backfill-phone-e164 dry run).
 *
 * Usage:
 *   npm run backfill-crm-from-leads            # dry run
 *   npm run backfill-crm-from-leads -- --write  # apply
 */
import { getPayload } from 'payload'
import configPromise from '../payload.config'

const WRITE = process.argv.includes('--write')

async function main() {
  const payload = await getPayload({ config: configPromise })

  const { docs: leads } = await payload.find({
    collection: 'leads',
    where: { phoneE164: { not_equals: null } },
    sort: 'createdAt', // oldest first, so a repeat contact's latest lead wins the name/company on upsert
    limit: 500,
    depth: 0,
  })

  let created = 0
  let skippedNoPhone = 0
  let skippedAlreadyLinked = 0

  const totalLeadsResult = await payload.find({ collection: 'leads', limit: 0 })
  skippedNoPhone = totalLeadsResult.totalDocs - leads.length

  for (const lead of leads) {
    const existingDeal = await payload.find({
      collection: 'deals',
      where: { originLead: { equals: lead.id } },
      limit: 1,
      depth: 0,
    })
    if (existingDeal.docs.length > 0) {
      skippedAlreadyLinked++
      console.log(`SKIP  ${lead.referenceCode}: already has a deal (#${existingDeal.docs[0].id})`)
      continue
    }

    console.log(`${WRITE ? 'WRITE' : 'DRY  '} ${lead.referenceCode}: ${lead.company || lead.name} <${lead.phoneE164}>`)

    if (!WRITE) {
      created++
      continue
    }

    // 1. Upsert the contact by phoneE164 - identical rule to fanOutLeadToCrm:
    // never let a later lead's name overwrite a manually-corrected one.
    const existingContact = await payload.find({
      collection: 'contacts',
      where: { phoneE164: { equals: lead.phoneE164 } },
      limit: 1,
      depth: 0,
    })

    let contactId: string | number
    if (existingContact.docs.length > 0) {
      const contact = existingContact.docs[0]
      contactId = contact.id
      if (contact.nameSource !== 'manual') {
        await payload.update({
          collection: 'contacts',
          id: contactId,
          data: {
            name: lead.name,
            company: lead.company || contact.company,
            email: lead.email || contact.email,
            nameSource: 'form',
          },
        })
      }
    } else {
      const newContact = await payload.create({
        collection: 'contacts',
        data: {
          name: lead.name,
          company: lead.company,
          phoneE164: lead.phoneE164,
          email: lead.email,
          nameSource: 'form',
          lastActivityAt: lead.createdAt,
        },
      })
      contactId = newContact.id
    }

    // 2. Create the deal, seeded with everything the lead already captured.
    type LeadItem = { productName?: string; quantity?: number }
    const items: LeadItem[] = Array.isArray(lead.items) ? lead.items : []
    const productInterest = items.filter((i) => i.productName).map((i) => ({ label: i.productName as string }))
    const totalQuantity = items.reduce((sum, i) => sum + (i.quantity || 0), 0) || undefined

    const deal = await payload.create({
      collection: 'deals',
      data: {
        title: `${lead.company || lead.name} - ${lead.referenceCode}`,
        contact: contactId,
        stage: 'qualified',
        occasion: lead.occasion || undefined,
        quantity: totalQuantity,
        productInterest,
        estimatedValue: typeof lead.estimatedTotal === 'number' && lead.estimatedTotal > 0 ? lead.estimatedTotal : undefined,
        estimatedValueConfidence: 'high',
        summary: lead.notes || undefined,
        source: lead.channel || undefined,
        originLead: lead.id,
      },
    })

    // 3. Log the activity so the deal's history shows where it came from.
    await payload.create({
      collection: 'activities',
      data: {
        contact: contactId,
        deal: deal.id,
        type: 'form_submitted',
        summary: `Backfilled from historical lead ${lead.referenceCode} (${lead.occasion || 'no occasion given'})`,
        meta: { leadId: lead.id, estimatedTotal: lead.estimatedTotal, backfilled: true },
      },
    })

    created++
  }

  console.log(
    `\n${WRITE ? 'Created' : 'Would create'} ${created} deal(s). ` +
      `Skipped ${skippedAlreadyLinked} already-linked, ${skippedNoPhone} with no usable phone.`,
  )
  if (!WRITE) console.log('Re-run with -- --write to apply.')
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
