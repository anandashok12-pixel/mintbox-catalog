import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { execSync } from 'child_process'

const XLSX = '/Users/anandashok/Downloads/corporate brochure (1).xlsx'

type Row = { sl: number; name: string; price: number }
type Doc = { id: number; name: string; price: number }

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function score(dbName: string, sheetName: string): number {
  const db = normalize(dbName)
  const sheet = normalize(sheetName)
  if (db === sheet) return 100
  if (db.includes(sheet) || sheet.includes(db)) return 80
  // word overlap score
  const dbWords = new Set(db.split(' ').filter((w) => w.length > 2))
  const sheetWords = sheet.split(' ').filter((w) => w.length > 2)
  if (sheetWords.length === 0) return 0
  const matches = sheetWords.filter((w) => dbWords.has(w)).length
  return Math.round((matches / sheetWords.length) * 60)
}

function loadRows(): Row[] {
  const json = execSync(
    `python3 -c "
import pandas as pd, json
df = pd.read_excel('${XLSX}', sheet_name='Catalogue')
subset = df[(df['Sl No'] >= 1) & (df['Sl No'] <= 223)]
out = []
for _, row in subset.iterrows():
    raw = float(row['Selling Price'])
    rounded = round(raw / 5) * 5
    out.append({'sl': int(row['Sl No']), 'name': str(row['Product']).strip(), 'price': int(rounded)})
print(json.dumps(out))
"`,
    { encoding: 'utf-8' },
  )
  return JSON.parse(json)
}

async function run() {
  const payload = await getPayload({ config: configPromise })
  const rows = loadRows()
  console.log(`Loaded ${rows.length} rows from spreadsheet`)

  // Fetch all products once
  const allResult = await payload.find({ collection: 'products', limit: 1000, depth: 0 })
  const allDocs = allResult.docs as Doc[]
  console.log(`Fetched ${allDocs.length} products from database\n`)

  let updated = 0
  let notFound = 0
  let unchanged = 0

  for (const row of rows) {
    // Score every DB product against this row's name
    const scored = allDocs
      .map((doc) => ({ doc, s: score(doc.name, row.name) }))
      .filter((x) => x.s >= 40)
      .sort((a, b) => b.s - a.s)

    if (scored.length === 0) {
      console.log(`  ❌ [${row.sl}] Not found: ${row.name.slice(0, 70)}`)
      notFound++
      continue
    }

    const best = scored[0]
    const doc = best.doc
    const oldPrice = doc.price

    if (oldPrice === row.price) {
      console.log(`  ✓  [${row.sl}] No change (${row.price}): ${doc.name.slice(0, 50)}`)
      unchanged++
      continue
    }

    await payload.update({
      collection: 'products',
      id: doc.id,
      data: { price: row.price },
    })
    const matchNote = best.s < 100 ? ` [~"${doc.name.slice(0, 40)}"]` : ''
    console.log(`  ✅ [${row.sl}] ${oldPrice} → ${row.price}: ${row.name.slice(0, 50)}${matchNote}`)
    updated++
  }

  console.log(`\nDone. Updated: ${updated}, Unchanged: ${unchanged}, Not found: ${notFound}`)
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
