import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { execSync } from 'child_process'

const XLSX = '/Users/anandashok/Downloads/corporate brochure (1).xlsx'

// Words that add no signal for matching
const STOPWORDS = new Set([
  'and','with','for','the','of','in','a','an','by','to','at','from','on','is','as',
  'set','pack','pcs','piece','pieces','box','gift','premium','gourmet','luxury','fine',
  'soft','pure','natural','organic','gluten','free','zero','no','all','100','made',
])

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function keywords(s: string): string[] {
  return normalize(s)
    .split(' ')
    .filter(w => w.length > 2 && !STOPWORDS.has(w) && !/^\d+$/.test(w))
}

function score(dbName: string, sheetName: string): number {
  const db = normalize(dbName)
  const sheet = normalize(sheetName)
  if (db === sheet) return 100
  if (db.includes(sheet) || sheet.includes(db)) return 85

  const dbKw = new Set(keywords(dbName))
  const sheetKw = keywords(sheetName)
  if (sheetKw.length === 0) return 0

  // weighted: longer shared words matter more
  let weightedMatches = 0
  let totalWeight = 0
  for (const w of sheetKw) {
    const weight = Math.min(w.length, 8)
    totalWeight += weight
    if (dbKw.has(w)) weightedMatches += weight
    // partial: db word starts with this word or vice versa
    else if ([...dbKw].some(dw => dw.startsWith(w) || w.startsWith(dw))) weightedMatches += weight * 0.6
  }
  return totalWeight > 0 ? Math.round((weightedMatches / totalWeight) * 70) : 0
}

async function run() {
  const rows: { sl: number; name: string; price: number }[] = JSON.parse(
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

  // Find the 80 not-found ones (score < 60 with current logic)
  const FOUND_THRESHOLD = 60
  const notFound = rows.filter(row => {
    const best = allDocs
      .map(doc => ({ s: score(doc.name, row.name) }))
      .sort((a, b) => b.s - a.s)[0]
    return !best || best.s < FOUND_THRESHOLD
  })

  console.log(`\nChecking ${notFound.length} unmatched rows against ${allDocs.length} DB products\n`)
  console.log('Format: [sl] SHEET NAME  →  DB CANDIDATE (score)\n')
  console.log('='.repeat(80))

  for (const row of notFound) {
    const candidates = allDocs
      .map(doc => ({ doc, s: score(doc.name, row.name) }))
      .filter(x => x.s >= 25)
      .sort((a, b) => b.s - a.s)
      .slice(0, 2)

    if (candidates.length === 0) {
      console.log(`[${row.sl}] ${row.name.slice(0, 60)}`)
      console.log(`      → (no candidate found)`)
    } else {
      console.log(`[${row.sl}] ${row.name.slice(0, 60)}`)
      for (const c of candidates) {
        const conf = c.s >= 50 ? '✅' : c.s >= 35 ? '🟡' : '❓'
        console.log(`      ${conf} "${c.doc.name}" (score ${c.s}, DB ₹${c.doc.price} → ₹${row.price})`)
      }
    }
    console.log()
  }

  process.exit(0)
}

run().catch(e => { console.error(e); process.exit(1) })
