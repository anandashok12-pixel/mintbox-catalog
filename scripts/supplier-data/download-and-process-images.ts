/**
 * Downloads each product's reference images and re-saves them locally as
 * neutral-filename WebP files for local review only. No supplier name appears
 * in any output path or filename. Run after fetch-supplier-data.ts.
 *
 * Usage: npx tsx scripts/supplier-data/download-and-process-images.ts
 */
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { CATALOG_PLAN } from './catalog-plan'

const SOURCE_FILE = path.join(__dirname, 'diwali-2026-source.json')
const OUT_ROOT = path.join(__dirname, '..', '..', 'public', 'catalog', 'diwali-2026')

interface SourceProduct {
  num: number
  imageUrls?: string[]
}

async function run() {
  const source: { products: SourceProduct[] } = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'))
  let totalSaved = 0
  const results: Array<{ slug: string; saved: number; errors: string[] }> = []

  for (const plan of CATALOG_PLAN) {
    const src = source.products.find((p: SourceProduct) => p.num === plan.num)
    const urls: string[] = (src?.imageUrls ?? []).slice(0, plan.imagesToUse)
    const outDir = path.join(OUT_ROOT, plan.slug)
    fs.mkdirSync(outDir, { recursive: true })

    const errors: string[] = []
    let saved = 0
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i]
      const outPath = path.join(outDir, `${plan.slug}-${i + 1}.webp`)
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const buf = Buffer.from(await res.arrayBuffer())
        await sharp(buf)
          .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outPath)
        saved++
        totalSaved++
      } catch (err) {
        errors.push(`image ${i + 1}: ${String(err)}`)
      }
    }
    console.log(`${plan.slug}: ${saved}/${urls.length} images saved${errors.length ? ` (${errors.length} failed)` : ''}`)
    results.push({ slug: plan.slug, saved, errors })
  }

  console.log(`\nDone. ${totalSaved} images saved across ${CATALOG_PLAN.length} products.`)
  const failed = results.filter(r => r.errors.length > 0)
  if (failed.length) {
    console.log('Products with image issues:')
    for (const f of failed) console.log(`  ${f.slug}: ${f.errors.join('; ')}`)
  }
  const empty = results.filter(r => r.saved === 0)
  if (empty.length) console.log('WARNING - zero images saved for:', empty.map(e => e.slug).join(', '))
}

run().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
