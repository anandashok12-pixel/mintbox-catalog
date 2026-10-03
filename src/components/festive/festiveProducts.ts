import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { DIWALI_CATEGORY_SLUGS } from '@/lib/festiveFacts'
import type { FestiveProduct, PickFilter, PickSection, PickSectionConfig } from './types'

// One query per request, shared by generateMetadata and the page render.
export const getInStockProducts = cache(async (): Promise<FestiveProduct[]> => {
  try {
    const payload = await getPayload({ config: configPromise })
    const res = await payload.find({
      collection: 'products',
      where: { inStock: { equals: true } },
      sort: 'order',
      limit: 1000,
      depth: 1,
    })
    return (res.docs as unknown as FestiveProduct[]).filter(p => Number.isFinite(Number(p.price)) && Number(p.price) > 0)
  } catch (err) {
    console.error('[festive-pages] Payload query failed:', err)
    return []
  }
})

function categorySlug(p: FestiveProduct): string {
  return typeof p.category === 'object' && p.category ? p.category.slug : ''
}

function haystack(p: FestiveProduct): string {
  const cat = typeof p.category === 'object' && p.category ? p.category.name : ''
  return [p.name, cat, ...(p.features?.map(f => f.feature) ?? [])].join(' ')
}

export function isDiwaliProduct(p: FestiveProduct): boolean {
  return DIWALI_CATEGORY_SLUGS.includes(categorySlug(p))
}

export function applyFilter(products: FestiveProduct[], f: PickFilter): FestiveProduct[] {
  const match = f.match ? new RegExp(f.match, 'i') : null
  const exclude = f.exclude ? new RegExp(f.exclude, 'i') : null
  let list = products.filter(p => {
    const diwali = isDiwaliProduct(p)
    if (f.scope === 'diwali' && !diwali) return false
    if (f.scope === 'other' && diwali) return false
    const price = Number(p.price)
    if (f.min != null && price < f.min) return false
    if (f.max != null && price > f.max) return false
    const text = haystack(p)
    if (match && !match.test(text)) return false
    if (exclude && exclude.test(text)) return false
    return true
  })
  if (f.sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
  if (f.sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
  return f.limit ? list.slice(0, f.limit) : list
}

/**
 * Resolves each section's filter against the live catalogue. A product only
 * appears in the first section it matches, so no card is repeated on a page.
 * Only the fields the cards need are sent to the browser.
 */
export async function resolvePicks(sections: PickSectionConfig[] | undefined): Promise<PickSection[]> {
  if (!sections?.length) return []
  const all = await getInStockProducts()
  const used = new Set<string>()
  return sections
    .map(s => {
      const products = applyFilter(all.filter(p => !used.has(String(p.id))), s.filter)
      products.forEach(p => used.add(String(p.id)))
      return {
        id: s.id,
        title: s.title,
        intro: s.intro,
        products: products.map(slim),
      }
    })
    .filter(s => s.products.length > 0)
}

function slim(p: FestiveProduct): FestiveProduct {
  const cat = typeof p.category === 'object' && p.category
    ? { id: String(p.category.id), name: p.category.name, slug: p.category.slug, emoji: p.category.emoji ?? null }
    : p.category
  return {
    id: String(p.id),
    name: p.name,
    price: Number(p.price),
    emoji: p.emoji ?? null,
    image: p.image
      ? { url: p.image.url ?? null, alt: p.image.alt ?? null, sizes: { card: { url: p.image.sizes?.card?.url ?? null } } }
      : null,
    description: p.description ?? '',
    features: p.features?.map(f => ({ feature: f.feature })) ?? null,
    moq: p.moq ?? null,
    customisable: p.customisable ?? null,
    category: cat,
  }
}
