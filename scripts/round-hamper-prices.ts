/**
 * Rounds every product price in Hampers & Boxes (category 92) to the nearest
 * multiple of ₹10 (halves round up, so 6045 → 6050).
 *
 * Usage:
 *   node --env-file=.env.local --require tsx/cjs scripts/round-hamper-prices.ts --dry
 *   node --env-file=.env.local --require tsx/cjs scripts/round-hamper-prices.ts
 */
import { getPayload } from 'payload'
import configPromise from '../payload.config'

const CATEGORY_ID = 92
const DRY = process.argv.includes('--dry')

async function run() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'products',
    where: { category: { equals: CATEGORY_ID } },
    pagination: false,
    depth: 0,
  })

  const changes = docs
    .map((p) => ({ id: p.id, name: p.name, from: p.price, to: Math.round(p.price / 10) * 10 }))
    .filter((c) => c.from !== c.to)

  console.log(`\n${docs.length} hampers, ${changes.length} to round${DRY ? ' (DRY RUN)' : ''}\n`)
  for (const c of changes) {
    console.log(`  ${c.id}  ${c.name}: ${c.from} → ${c.to}`)
    if (!DRY) await payload.update({ collection: 'products', id: c.id, data: { price: c.to } })
  }
  console.log('\nDone.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
