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
 * so this is safe to re-run. Phone remains the preferred contact identity;
 * historical rows without a usable phone fall back to their form email.
 *
 * Usage:
 *   npm run backfill-crm-from-leads            # dry run
 *   npm run backfill-crm-from-leads -- --write  # apply
 */
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { backfillCrmFromLeads } from '../src/lib/backfillCrmFromLeads'

const WRITE = process.argv.includes('--write')

async function main() {
  const payload = await getPayload({ config: configPromise })
  const summary = await backfillCrmFromLeads({ payload, write: WRITE, log: console.log })
  console.log(`\n${JSON.stringify(summary, null, 2)}`)
  if (!WRITE) console.log('Re-run with -- --write to apply.')
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
