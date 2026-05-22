import { Client } from 'pg'

async function main() {
  const url = (process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL || '').replace(/\\n/g, '').trim()
  const client = new Client({ connectionString: url })
  await client.connect()

  const { rows: cats } = await client.query(`SELECT id, name, slug FROM categories ORDER BY "order"`)
  console.log('=== CATEGORIES ===')
  for (const c of cats) console.log(`  ${c.id}\t${c.name}\t${c.slug}`)

  const { rows: products } = await client.query(`SELECT id, name FROM products ORDER BY name`)
  console.log(`\n=== PRODUCTS (${products.length}) ===`)
  for (const p of products) console.log(`  ${p.id}\t${p.name}`)

  await client.end()
}

main().catch((e) => { console.error(e); process.exit(1) })
