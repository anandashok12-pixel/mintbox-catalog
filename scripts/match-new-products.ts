import { readdirSync } from 'fs'
import { execSync } from 'child_process'

const IMAGES_DIR = '/Users/anandashok/Downloads/Corporate Catalog Product Images'
const XLSX = '/Users/anandashok/Downloads/corporate brochure-2.xlsx'

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/\.(png|jpe?g|webp|gif)$/i, '')
    .replace(/[^a-z0-9]+/g, '')
    .trim()
}

const products = JSON.parse(
  execSync(
    `python3 -c "
import pandas as pd, json
df = pd.read_excel('${XLSX}', sheet_name='Catalogue')
subset = df[(df['Sl No'] >= 224) & (df['Sl No'] <= 260)]
out = []
for _, row in subset.iterrows():
    out.append({
        'sl': int(row['Sl No']),
        'name': str(row['Product']),
        'price': float(row['Selling Price']) if pd.notna(row['Selling Price']) else 0,
        'desc': str(row['Product Description']) if pd.notna(row['Product Description']) else str(row['Product']),
        'xlsxCat': str(row['Category']) if pd.notna(row['Category']) else '',
    })
print(json.dumps(out))
"`,
    { encoding: 'utf-8' },
  ),
)

const files = readdirSync(IMAGES_DIR)
const fileMap = new Map<string, string>()
for (const f of files) fileMap.set(normalize(f), f)

function findImage(name: string): { type: 'exact' | 'fuzzy' | 'none'; file?: string; candidates?: string[] } {
  const key = normalize(name)
  const exact = fileMap.get(key)
  if (exact) return { type: 'exact', file: exact }

  // Try matching the first N chars (truncated to ~50)
  const shortKey = key.slice(0, 60)
  const candidates: string[] = []
  for (const [fk, fv] of fileMap.entries()) {
    if (fk.startsWith(shortKey.slice(0, 25)) || shortKey.startsWith(fk.slice(0, 25))) {
      candidates.push(fv)
    }
  }
  // Try first 4 distinctive words from name
  const words = name
    .replace(/[^a-zA-Z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .slice(0, 4)
    .join(' ')
  if (words) {
    const wordKey = normalize(words)
    for (const [fk, fv] of fileMap.entries()) {
      if (fk.startsWith(wordKey.slice(0, 15)) && !candidates.includes(fv)) candidates.push(fv)
    }
  }

  if (candidates.length > 0) return { type: 'fuzzy', candidates: candidates.slice(0, 5) }
  return { type: 'none' }
}

for (const p of products) {
  const m = findImage(p.name)
  const head = `[${p.sl}] ${p.name.slice(0, 80)}`
  if (m.type === 'exact') console.log(`✅ ${head}\n   -> ${m.file}`)
  else if (m.type === 'fuzzy') console.log(`🔍 ${head}\n   -> ${m.candidates!.join('\n      ')}`)
  else console.log(`❌ ${head}\n   (no match)`)
}
