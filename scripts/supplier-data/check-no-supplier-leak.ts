/**
 * Fails if the supplier name leaks anywhere in the Diwali 2026 feature: source
 * files, generated dataset, image filenames, or (if present) the built .next
 * output for the preview route. Run after assemble-local-dataset.ts and again
 * after `npm run build`.
 *
 * Usage: npx tsx scripts/supplier-data/check-no-supplier-leak.ts
 */
import fs from 'fs'
import path from 'path'

const ROOT = path.join(__dirname, '..', '..')
const RE = /aura\s*decor/i

const TARGET_DIRS = [
  'src/data',
  'src/app/(main)/dev-preview/diwali-2026-catalog',
  'src/components/pages/Diwali2026PreviewClient.tsx',
  'public/catalog/diwali-2026',
  'scripts/import-diwali-2026-catalog.ts',
]

let hits = 0

function walk(p: string) {
  const full = path.join(ROOT, p)
  if (!fs.existsSync(full)) return
  const stat = fs.statSync(full)
  if (stat.isDirectory()) {
    for (const child of fs.readdirSync(full)) walk(path.join(p, child))
    return
  }
  // filename check
  if (RE.test(path.basename(full))) {
    console.error(`LEAK (filename): ${p}`)
    hits++
  }
  // content check (skip binary image files). NFKC normalization folds
  // stylized unicode (e.g. mathematical bold "𝗔𝘂𝗿𝗮𝗗𝗲𝗰𝗼𝗿") back to plain
  // ASCII so a supplier name pasted in a fancy font from source copy can't slip past.
  if (!/\.(webp|jpg|jpeg|png|avif)$/i.test(full)) {
    const content = fs.readFileSync(full, 'utf8').normalize('NFKC')
    if (RE.test(content)) {
      console.error(`LEAK (content): ${p}`)
      hits++
    }
  }
}

for (const t of TARGET_DIRS) walk(t)

if (hits > 0) {
  console.error(`\nFAILED: ${hits} supplier-name leak(s) found.`)
  process.exit(1)
} else {
  console.log('OK: no supplier-name leaks found in checked paths.')
}
