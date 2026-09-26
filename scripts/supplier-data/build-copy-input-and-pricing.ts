/**
 * Computes MintBox pricing for all 50 products and builds a sanitized
 * "copy-input" file (facts only, supplier name stripped) for the copywriting
 * pass. Also writes pricing-review.csv for margin review.
 *
 * Usage: npx tsx scripts/supplier-data/build-copy-input-and-pricing.ts
 */
import fs from 'fs'
import path from 'path'
import { CATALOG_PLAN } from './catalog-plan'
import { PRODUCT_LIST, BULK_PACKS } from './product-list'
import { computeMrp, MARKUP_MULTIPLIER } from '../../src/config/pricing'

const SOURCE_FILE = path.join(__dirname, 'diwali-2026-source.json')
const CSV_FILE = path.join(__dirname, 'pricing-review.csv')
const COPY_INPUT_FILE = path.join(__dirname, 'copy-input.json')

interface SourceProduct {
  num: number
  fetchOk: boolean
  minPrice?: number
  maxPrice?: number
  supplierBodyText?: string
  supplierTags?: string[]
}

interface CopyInputEntry {
  num: number
  id: string
  slug: string
  name: string
  category: string
  tier: string | undefined
  mrp: number
  displayMode: string
  moq: number
  customisable: boolean
  referenceFacts: string
  supplierTags: string[]
  imageCount: number
  bulkNote: string
  internalBulkCost: number | undefined
}

function sanitize(text: string): string {
  return text.replace(/aura\s*decor/gi, 'the manufacturer')
}

function run() {
  const source: { products: SourceProduct[] } = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'))
  const csvRows = ['id,name,tier,supplierCost,multiplier,mrp,displayMode,bulkNote']
  const copyInput: CopyInputEntry[] = []

  for (const plan of CATALOG_PLAN) {
    const src = source.products.find((p: SourceProduct) => p.num === plan.num)
    const listItem = PRODUCT_LIST.find(p => p.num === plan.num)
    if (!src || !src.fetchOk) {
      console.warn(`WARNING: no usable source data for #${plan.num} ${plan.slug}`)
      continue
    }
    const supplierCost = src.minPrice ?? 0
    const displayMode = src.minPrice && src.maxPrice && src.minPrice !== src.maxPrice ? 'starting-from' : 'fixed'
    const mrp = computeMrp(supplierCost)

    const bulk = BULK_PACKS.find(b => b.relatesToNum === plan.num)
    const bulkNote = bulk ? `Volume pricing available - ${bulk.label.replace(/,\s*\d+\s*(boxes|sets|pcs)/i, '').trim()}` : 'Volume pricing available for 50+ units'
    const bulkCost = bulk ? Number(bulk.priceRaw) : undefined

    csvRows.push([
      plan.id,
      `"${plan.name.replace(/"/g, '""')}"`,
      listItem?.tier,
      supplierCost,
      MARKUP_MULTIPLIER,
      mrp,
      displayMode,
      `"${bulkNote}"`,
    ].join(','))

    copyInput.push({
      num: plan.num,
      id: plan.id,
      slug: plan.slug,
      name: plan.name,
      category: plan.category,
      tier: listItem?.tier,
      mrp,
      displayMode,
      moq: plan.moq,
      customisable: plan.customisable,
      referenceFacts: sanitize(src.supplierBodyText || ''),
      supplierTags: (src.supplierTags || []).map(sanitize),
      imageCount: plan.imagesToUse,
      bulkNote,
      internalBulkCost: bulkCost,
    })
  }

  fs.writeFileSync(CSV_FILE, csvRows.join('\n') + '\n')
  fs.writeFileSync(COPY_INPUT_FILE, JSON.stringify(copyInput, null, 2))
  console.log(`Wrote ${csvRows.length - 1} pricing rows to ${CSV_FILE}`)
  console.log(`Wrote ${copyInput.length} copy-input entries to ${COPY_INPUT_FILE}`)
}

run()
