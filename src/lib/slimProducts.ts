/**
 * Reduce Payload product docs to the fields client components actually use.
 * Passing full docs (with media metadata, timestamps, all image sizes) to
 * client components inflated page HTML to ~1MB on content pages.
 */
type Id = string | number

interface CategoryInput {
  id: Id
  name: string
  emoji?: string | null
  slug: string
}

interface ProductInput {
  id: Id
  name: string
  price: number
  emoji?: string | null
  image?: Id | { url?: string | null; sizes?: { card?: { url?: string | null } | null } | null } | null
  description: string
  features?: { feature: string; id?: string | null }[] | null
  moq?: number | null
  customisable?: boolean | null
  inStock?: boolean | null
  category: Id | CategoryInput
}

// Ids keep their original type (numeric from Postgres): the cart and the
// catalogue compare ids with ===, so stringifying here would split one
// product into two cart lines.
export interface SlimCategory {
  id: Id
  name: string
  emoji: string | null
  slug: string
}

export interface SlimProduct {
  id: Id
  name: string
  price: number
  emoji: string | null
  image: { url: string | null; sizes: { card: { url: string | null } } } | null
  description: string
  features: { feature: string; id?: string }[] | null
  moq: number | null
  customisable: boolean | null
  inStock: boolean | null
  category: SlimCategory | Id
}

const slimCategory = (c: Id | CategoryInput): SlimCategory | Id =>
  c && typeof c === 'object'
    ? { id: c.id, name: c.name, emoji: c.emoji ?? null, slug: c.slug }
    : c

// The project has no generated Payload types, so find() returns loose
// JsonObject docs. Callers always pass `products` collection docs.
export function slimProducts(docs: readonly object[]): SlimProduct[] {
  return (docs as ProductInput[]).map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    emoji: p.emoji ?? null,
    image:
      p.image && typeof p.image === 'object'
        ? {
            url: p.image.url ?? null,
            sizes: { card: { url: p.image.sizes?.card?.url ?? null } },
          }
        : null,
    description: p.description,
    features: Array.isArray(p.features)
      ? p.features.map((f) => ({ feature: f.feature, id: f.id ?? undefined }))
      : null,
    moq: p.moq ?? null,
    customisable: p.customisable ?? null,
    inStock: p.inStock ?? null,
    category: slimCategory(p.category),
  }))
}
