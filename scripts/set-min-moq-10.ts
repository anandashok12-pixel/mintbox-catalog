/**
 * Raises every product whose MOQ is below 10 (or unset) to 10, the MintBox
 * minimum for everything (confirmed 2026-10-03). A handful of older imports
 * still carry MOQ 5, which contradicts the "MOQ 10" copy on every page.
 *
 * Reads are anonymous; --apply logs in as a Payload admin via
 * PAYLOAD_ADMIN_EMAIL / PAYLOAD_ADMIN_PASSWORD (see scripts/lib/payloadAuth.ts).
 *
 * Usage:
 *   npx tsx scripts/set-min-moq-10.ts                 # dry run, lists the products
 *   npx tsx scripts/set-min-moq-10.ts --apply         # writes moq: 10
 *   npx tsx scripts/set-min-moq-10.ts --base-url=http://localhost:3000
 */
import { authHeaders } from './lib/payloadAuth'

const APPLY = process.argv.includes('--apply')
const BASE_URL = (
  process.argv.find((a) => a.startsWith('--base-url='))?.split('=')[1] ?? 'https://themintbox.in'
).replace(/\/$/, '')
const MOQ = 10

interface Product {
  id: number
  name: string
  moq?: number | null
}

async function fetchLowMoq(): Promise<Product[]> {
  const params = new URLSearchParams({
    'where[or][0][moq][less_than]': String(MOQ),
    'where[or][1][moq][exists]': 'false',
    limit: '0',
    depth: '0',
    pagination: 'false',
  })
  const res = await fetch(`${BASE_URL}/api/products?${params}`, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`Product lookup failed: HTTP ${res.status}`)
  const data = (await res.json()) as { docs: Product[] }
  return data.docs
}

async function main() {
  const products = await fetchLowMoq()
  console.log(`${products.length} product(s) with MOQ below ${MOQ} at ${BASE_URL}`)
  for (const p of products) console.log(`  #${p.id}  moq=${p.moq ?? 'unset'}  ${p.name}`)

  if (!APPLY) {
    console.log('\nDry run. Re-run with --apply to set moq: 10.')
    return
  }

  const headers = { 'Content-Type': 'application/json', ...(await authHeaders(BASE_URL)) }
  let failed = 0
  for (const p of products) {
    const res = await fetch(`${BASE_URL}/api/products/${p.id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ moq: MOQ }),
    })
    if (!res.ok) {
      failed++
      console.error(`  ✗ #${p.id} ${p.name}: HTTP ${res.status}`)
    }
  }
  console.log(`\nUpdated ${products.length - failed} of ${products.length}.`)
  if (failed) process.exitCode = 1
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
