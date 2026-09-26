/**
 * Backfills Leads.phoneE164 for rows created before the field existed.
 * The beforeChange hook only fires on future saves - this is the one-off
 * pass over history so every existing lead can join to a contact.
 *
 * Usage:
 *   npm run backfill-phone-e164            # dry run, prints what would change
 *   npm run backfill-phone-e164 -- --write  # actually update the rows
 */
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { normalizePhone } from '../src/lib/phone'

const WRITE = process.argv.includes('--write')

async function main() {
  const payload = await getPayload({ config: configPromise })

  let page = 1
  let updated = 0
  let skipped = 0
  const limit = 100

  for (;;) {
    const { docs, totalPages } = await payload.find({
      collection: 'leads',
      where: { phoneE164: { equals: null } },
      limit,
      page,
      depth: 0,
    })

    for (const lead of docs) {
      const phone = typeof lead.phone === 'string' ? lead.phone : ''
      const e164 = phone ? normalizePhone(phone) : null

      if (!e164) {
        skipped++
        console.log(`SKIP  ${lead.referenceCode}: no usable phone ("${phone}")`)
        continue
      }

      console.log(`${WRITE ? 'WRITE' : 'DRY  '} ${lead.referenceCode}: "${phone}" -> ${e164}`)
      if (WRITE) {
        // fanOutLeadToCrm only runs on operation === 'create', so this
        // update never spawns a duplicate contact/deal for a historical lead.
        await payload.update({
          collection: 'leads',
          id: lead.id,
          data: { phoneE164: e164 },
        })
      }
      updated++
    }

    if (page >= totalPages) break
    page++
  }

  console.log(`\n${WRITE ? 'Updated' : 'Would update'} ${updated} lead(s), skipped ${skipped} (no usable phone).`)
  if (!WRITE) console.log('Re-run with -- --write to apply.')
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
