/**
 * Fetches reference facts (contents, size, fragrance, burn time) for the 50
 * Diwali 2026 / corporate gifting products from the supplier's public Shopify
 * product JSON endpoint. Raw responses are reference material only — saved to
 * the gitignored raw/ folder and never rendered or shipped. Normalised output
 * (scripts/supplier-data/diwali-2026-source.json) still carries the internal
 * `supplier` field for scripts/import-diwali-2026-auradecor.ts; it is never
 * imported by anything under src/.
 *
 * Usage: npx tsx scripts/supplier-data/fetch-supplier-data.ts
 */
import fs from 'fs'
import path from 'path'
import { PRODUCT_LIST, BULK_PACKS } from './product-list'

const SUPPLIER_HOST = 'auradecor.co.in'
const RAW_DIR = path.join(__dirname, 'raw')
const OUT_FILE = path.join(__dirname, 'diwali-2026-source.json')

interface ShopifyVariant {
  title: string
  price: string
  available?: boolean
}

interface ShopifyImage {
  src: string
}

interface ShopifyProduct {
  title: string
  body_html?: string
  tags?: string | string[]
  variants?: ShopifyVariant[]
  images?: ShopifyImage[]
}

fs.mkdirSync(RAW_DIR, { recursive: true })

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

interface NormalizedProduct {
  num: number
  tier: string
  workingName: string
  handle: string
  fetchOk: boolean
  supplierTitle?: string
  supplierBodyText?: string
  supplierTags?: string[]
  variants?: Array<{ title: string; price: number; available: boolean }>
  minPrice?: number
  maxPrice?: number
  available?: boolean
  imageUrls?: string[]
  error?: string
}

async function fetchOne(handle: string): Promise<ShopifyProduct> {
  const url = `https://${SUPPLIER_HOST}/products/${handle}.json`
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${handle}`)
  const data = await res.json()
  fs.writeFileSync(path.join(RAW_DIR, `${handle}.json`), JSON.stringify(data, null, 2))
  return data.product
}

async function run() {
  const normalized: NormalizedProduct[] = []
  const bulkNormalized: Array<{ relatesToNum: number; label: string; fetchOk: boolean; handle: string; priceForPack?: number; unitsInPack?: string; error?: string }> = []

  for (const item of PRODUCT_LIST) {
    process.stdout.write(`Fetching #${item.num} ${item.handle} ... `)
    try {
      const p = await fetchOne(item.handle)
      const variants = (p.variants ?? []).map((v: ShopifyVariant) => ({
        title: v.title,
        price: Number(v.price),
        available: Boolean(v.available),
      }))
      const prices = variants.map((v: { price: number }) => v.price).filter((n: number) => Number.isFinite(n))
      normalized.push({
        num: item.num,
        tier: item.tier,
        workingName: item.workingName,
        handle: item.handle,
        fetchOk: true,
        supplierTitle: p.title,
        supplierBodyText: stripHtml(p.body_html || ''),
        supplierTags: Array.isArray(p.tags) ? p.tags : typeof p.tags === 'string' ? p.tags.split(',').map((t: string) => t.trim()) : [],
        variants,
        minPrice: prices.length ? Math.min(...prices) : undefined,
        maxPrice: prices.length ? Math.max(...prices) : undefined,
        available: variants.some((v: { available: boolean }) => v.available),
        imageUrls: (p.images ?? []).map((im: ShopifyImage) => im.src),
      })
      console.log('ok')
    } catch (err) {
      normalized.push({ num: item.num, tier: item.tier, workingName: item.workingName, handle: item.handle, fetchOk: false, error: String(err) })
      console.log('FAILED:', String(err))
    }
    await new Promise(r => setTimeout(r, 250)) // be polite to the supplier's storefront
  }

  for (const bp of BULK_PACKS) {
    process.stdout.write(`Fetching bulk pack ${bp.handle} ... `)
    try {
      const p = await fetchOne(bp.handle)
      const variants = (p.variants ?? []).map((v: ShopifyVariant) => ({ title: v.title, price: Number(v.price) }))
      bulkNormalized.push({ relatesToNum: bp.relatesToNum, label: bp.label, fetchOk: true, handle: bp.handle, priceForPack: variants[0]?.price, unitsInPack: bp.label })
      console.log('ok')
    } catch (err) {
      bulkNormalized.push({ relatesToNum: bp.relatesToNum, label: bp.label, fetchOk: false, handle: bp.handle, error: String(err) })
      console.log('FAILED:', String(err))
    }
    await new Promise(r => setTimeout(r, 250))
  }

  const failed = normalized.filter(n => !n.fetchOk)
  fs.writeFileSync(OUT_FILE, JSON.stringify({ fetchedAt: new Date().toISOString(), products: normalized, bulkPacks: bulkNormalized }, null, 2))
  console.log(`\nDone. ${normalized.length - failed.length}/${normalized.length} products fetched OK.`)
  if (failed.length) console.log('Failed:', failed.map(f => `#${f.num} ${f.handle}`).join(', '))
  console.log(`Normalized data written to ${OUT_FILE}`)
}

run().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
