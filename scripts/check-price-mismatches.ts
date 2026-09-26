import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { execSync } from 'child_process'

const XLSX = '/Users/anandashok/Downloads/corporate brochure (1).xlsx'

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function score(dbName: string, sheetName: string): number {
  const db = normalize(dbName)
  const sheet = normalize(sheetName)
  if (db === sheet) return 100
  if (db.includes(sheet) || sheet.includes(db)) return 80
  const dbWords = new Set(db.split(' ').filter((w) => w.length > 2))
  const sheetWords = sheet.split(' ').filter((w) => w.length > 2)
  if (sheetWords.length === 0) return 0
  const matches = sheetWords.filter((w) => dbWords.has(w)).length
  return Math.round((matches / sheetWords.length) * 60)
}

async function run() {
  const rows = JSON.parse(
    execSync(
      `python3 -c "
import pandas as pd, json
df = pd.read_excel('${XLSX}', sheet_name='Catalogue')
subset = df[(df['Sl No'] >= 1) & (df['Sl No'] <= 223)]
out = []
for _, row in subset.iterrows():
    rounded = round(float(row['Selling Price']) / 5) * 5
    out.append({'sl': int(row['Sl No']), 'name': str(row['Product']).strip(), 'price': int(rounded)})
print(json.dumps(out))
"`,
      { encoding: 'utf-8' },
    ),
  )

  const payload = await getPayload({ config: configPromise })
  const allDocs = (await payload.find({ collection: 'products', limit: 1000, depth: 0 })).docs as any[]

  let notInDb = 0
  let mismatch = 0

  console.log('\n=== Products not yet updated ===\n')

  for (const row of rows) {
    const best = allDocs
      .map((doc) => ({ doc, s: score(doc.name, row.name) }))
      .filter((x) => x.s >= 60)
      .sort((a, b) => b.s - a.s)[0]

    if (!best) {
      console.log(`❌ [${row.sl}] NOT IN DB        | Target ₹${row.price} | ${row.name.slice(0, 65)}`)
      notInDb++
    } else if (best.doc.price !== row.price) {
      console.log(`⚠️  [${row.sl}] PRICE MISMATCH  | DB ₹${best.doc.price} → Target ₹${row.price} | ${best.doc.name.slice(0, 50)}`)
      mismatch++
    }
  }

  console.log(`\nNot in DB: ${notInDb}, Price mismatch: ${mismatch}`)
  process.exit(0)
}

run().catch((e) => { console.error(e); process.exit(1) })
