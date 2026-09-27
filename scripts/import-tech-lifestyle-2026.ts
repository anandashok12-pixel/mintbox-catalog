/**
 * Import the 20 tech and lifestyle products (plus 3 optional bundles) from
 * Anand's 2026-09-27 brief into their existing categories (tech-items,
 * bags-backpacks, diaries, home-living). No new categories are created -
 * per Anand's explicit choice, this run reuses existing categories only, so
 * the script fails fast if one of those slugs doesn't exist rather than
 * creating it.
 *
 * MintBox price = vendor price x 1.2, rounded (per Anand, 2026-09-27).
 * Bundle price = sum of its component items' own computed prices.
 * No images are attached - each product gets its `emoji` fallback instead,
 * matching this catalogue's existing no-photo convention.
 *
 * Usage:
 *   npm run import-tech-lifestyle-2026 -- --dry     # print what would happen, no writes
 *   npm run import-tech-lifestyle-2026              # create products live
 *
 * Idempotent: products are matched by name.
 */
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import { TECH_LIFESTYLE_PRODUCTS, TECH_LIFESTYLE_BUNDLES } from './tech-lifestyle-2026-data'

const DRY = process.argv.includes('--dry')
const MARKUP = 1.2

const mintboxPrice = (vendorPrice: number) => Math.round(vendorPrice * MARKUP)

async function run() {
  // fail fast on data problems before touching the database
  const names = new Set<string>()
  for (const p of [...TECH_LIFESTYLE_PRODUCTS, ...TECH_LIFESTYLE_BUNDLES]) {
    if (names.has(p.name)) throw new Error(`Duplicate product name: ${p.name}`)
    names.add(p.name)
  }
  const slugToPrice = new Map(TECH_LIFESTYLE_PRODUCTS.map((p) => [p.slug, mintboxPrice(p.vendorPrice)]))
  for (const b of TECH_LIFESTYLE_BUNDLES) {
    for (const componentSlug of b.bundleOf) {
      if (!slugToPrice.has(componentSlug)) {
        throw new Error(`Bundle "${b.name}" references unknown product slug: ${componentSlug}`)
      }
    }
  }

  const payload = await getPayload({ config: configPromise })
  console.log(
    `\nImporting ${TECH_LIFESTYLE_PRODUCTS.length} products + ${TECH_LIFESTYLE_BUNDLES.length} bundles${DRY ? ' (DRY RUN)' : ''}\n`,
  )

  const categorySlugs = [...new Set([...TECH_LIFESTYLE_PRODUCTS, ...TECH_LIFESTYLE_BUNDLES].map((p) => p.categorySlug))]
  const categoryIdBySlug = new Map<string, number>()
  for (const slug of categorySlugs) {
    const found = await payload.find({ collection: 'categories', where: { slug: { equals: slug } }, limit: 1 })
    const category = found.docs[0]
    if (!category) {
      throw new Error(`Category "${slug}" does not exist. This run reuses existing categories only - aborting rather than creating it.`)
    }
    categoryIdBySlug.set(slug, category.id as number)
    console.log(`  Using existing category: ${category.name} (slug ${slug}, id ${category.id})`)
  }

  let created = 0
  let skipped = 0
  const placeholderEmojiSlots: { slug: string; emoji: string }[] = []

  // orderCounters tracks the next `order` value per category, continuing after
  // whatever is already there rather than colliding with existing products.
  const orderCounters = new Map<string, number>()
  for (const [slug, categoryId] of categoryIdBySlug) {
    const count = await payload.count({ collection: 'products', where: { category: { equals: categoryId } } })
    orderCounters.set(slug, count.totalDocs + 1)
  }

  async function createOrSkip(data: {
    slug: string
    name: string
    categorySlug: string
    tier: string
    tags: string[]
    description: string
    features: string[]
    emoji: string
    customisable: boolean
    inStock: boolean
    price: number
  }) {
    const existing = await payload.find({ collection: 'products', where: { name: { equals: data.name } } })
    if (existing.docs.length) {
      console.log(`  Exists, skipping: ${data.name}`)
      skipped++
      return
    }
    const order = orderCounters.get(data.categorySlug)!
    orderCounters.set(data.categorySlug, order + 1)
    if (DRY) {
      console.log(
        `  Would create: ${data.name} - ₹${data.price} - category:${data.categorySlug} - tier:${data.tier} - inStock:${data.inStock} - order:${order}`,
      )
      created++
      placeholderEmojiSlots.push({ slug: data.slug, emoji: data.emoji })
      return
    }
    await payload.create({
      collection: 'products',
      data: {
        name: data.name,
        category: categoryIdBySlug.get(data.categorySlug)!,
        price: data.price,
        emoji: data.emoji,
        description: data.description,
        features: data.features.map((feature) => ({ feature })),
        moq: 10,
        customisable: data.customisable,
        inStock: data.inStock,
        order,
        tier: data.tier,
        tags: data.tags,
      },
    })
    console.log(`  Created: ${data.name} - ₹${data.price}${data.inStock ? '' : ' (inStock: false, supply unconfirmed)'}`)
    created++
    placeholderEmojiSlots.push({ slug: data.slug, emoji: data.emoji })
  }

  for (const p of TECH_LIFESTYLE_PRODUCTS) {
    await createOrSkip({
      slug: p.slug,
      name: p.name,
      categorySlug: p.categorySlug,
      tier: p.tier,
      tags: p.tags,
      description: p.description,
      features: p.features,
      emoji: p.emoji,
      customisable: p.customisable,
      inStock: p.inStock,
      price: mintboxPrice(p.vendorPrice),
    })
  }

  for (const b of TECH_LIFESTYLE_BUNDLES) {
    const price = b.bundleOf.reduce((sum, slug) => sum + slugToPrice.get(slug)!, 0)
    const componentNames = b.bundleOf.map((slug) => TECH_LIFESTYLE_PRODUCTS.find((p) => p.slug === slug)!.name)
    await createOrSkip({
      slug: b.slug,
      name: b.name,
      categorySlug: b.categorySlug,
      tier: b.tier,
      tags: b.tags,
      description: b.description,
      features: componentNames.map((n) => `Includes: ${n}`),
      emoji: b.emoji,
      customisable: true,
      inStock: true,
      price,
    })
  }

  console.log(`\nDone. Created ${created}, skipped ${skipped}.`)
  if (placeholderEmojiSlots.length) {
    console.log(`\nPlaceholder (emoji-only, no photo) image slots:`)
    for (const { slug, emoji } of placeholderEmojiSlots) {
      console.log(`  - ${slug} (${emoji})`)
    }
  }
  process.exit(0)
}

run().catch((err) => {
  console.error('Failed:', err)
  process.exit(1)
})
