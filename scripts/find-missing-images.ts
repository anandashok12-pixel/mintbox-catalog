import { Client } from 'pg'
import { readdirSync } from 'fs'

const IMAGES_DIR = '/Users/anandashok/Downloads/Corporate Catalog Product Images'

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/\.(png|jpe?g|webp|gif)$/i, '')
    .replace(/[^a-z0-9]+/g, '')
    .trim()
}

async function main() {
  // Clean stray "\n" in env value
  const url = (process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL || '').replace(/\\n/g, '').trim()
  if (!url) throw new Error('No POSTGRES_URL env')

  const client = new Client({ connectionString: url })
  await client.connect()

  // Inspect schema first if needed
  const { rows: tables } = await client.query(
    `SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name`,
  )
  console.error('Tables:', tables.map((r: any) => r.table_name).join(', '))

  // Look at products columns
  const { rows: cols } = await client.query(
    `SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name='products' ORDER BY ordinal_position`,
  )
  console.error('Products cols:', cols.map((r: any) => r.column_name).join(', '))

  const { rows: products } = await client.query(
    `SELECT id, name, image_id FROM products ORDER BY name`,
  )

  const missing = products.filter((p) => !p.image_id)
  const withImg = products.filter((p) => !!p.image_id)

  console.log(`\nTotal products: ${products.length}`)
  console.log(`With image:    ${withImg.length}`)
  console.log(`Missing image: ${missing.length}\n`)

  const files = readdirSync(IMAGES_DIR)
  const fileMap = new Map<string, string>()
  for (const f of files) fileMap.set(normalize(f), f)

  const exact: { product: string; file: string }[] = []
  const fuzzy: { product: string; candidates: string[] }[] = []
  const unmatched: string[] = []

  for (const p of missing) {
    const key = normalize(p.name)
    const file = fileMap.get(key)
    if (file) {
      exact.push({ product: p.name, file })
    } else {
      const candidates: string[] = []
      for (const [fk, fv] of fileMap.entries()) {
        if (fk === key) continue
        if (fk.startsWith(key) || key.startsWith(fk) || fk.includes(key) || key.includes(fk)) {
          if (Math.abs(fk.length - key.length) < 25 && key.length > 3) candidates.push(fv)
        }
      }
      if (candidates.length > 0) fuzzy.push({ product: p.name, candidates })
      else unmatched.push(p.name)
    }
  }

  console.log(`=== EXACT MATCHES (${exact.length}) ===`)
  for (const m of exact) console.log(`  ${m.product}  ->  ${m.file}`)

  console.log(`\n=== FUZZY MATCHES (${fuzzy.length}) ===`)
  for (const m of fuzzy) console.log(`  ${m.product}\n      ${m.candidates.join('\n      ')}`)

  console.log(`\n=== NO MATCH (${unmatched.length}) ===`)
  for (const u of unmatched) console.log(`  ${u}`)

  await client.end()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
