// Types for the festive guide pages. Everything in a FestivePageConfig must
// stay serialisable: the config is read on the server (metadata, JSON-LD,
// product filtering) and then passed to the client layout as props.

export interface FestiveCategory {
  id: string
  name: string
  slug: string
  emoji?: string | null
}

export interface FestiveProduct {
  id: string
  name: string
  price: number
  emoji?: string | null
  image?: { url?: string | null; alt?: string | null; sizes?: { card?: { url?: string | null } } } | null
  description: string
  features?: Array<{ feature: string; id?: string }> | null
  moq?: number | null
  customisable?: boolean | null
  category: FestiveCategory | string
}

/** Which products a picks section shows. Regexes are passed as source strings. */
export interface PickFilter {
  /** 'diwali' = Diwali gift box categories only, 'other' = everything else, 'all' = both */
  scope: 'diwali' | 'other' | 'all'
  min?: number
  max?: number
  /** case-insensitive regex source, tested against name + contents + category */
  match?: string
  /** case-insensitive regex source; matching products are dropped */
  exclude?: string
  sort?: 'curated' | 'price-asc' | 'price-desc'
  limit?: number
}

export interface PickSectionConfig {
  id: string
  title: string
  intro: string
  filter: PickFilter
}

export interface PickSection {
  id: string
  title: string
  intro: string
  products: FestiveProduct[]
}

export interface Idea {
  name: string
  price?: string
  desc: string
}

export interface TitledItem {
  title: string
  desc: string
}

export interface FaqItem {
  q: string
  /** May contain simple <a href> links to other MintBox pages. */
  a: string
}

export interface RelatedLink {
  label: string
  title: string
  href: string
}

export interface FestivePageConfig {
  /** Path without domain, e.g. /guides/diwali-gifts-for-clients */
  path: string
  metaTitle: string
  metaDescription: string
  /** Parents shown in the breadcrumb, before the current page */
  parents: Array<{ name: string; href: string }>
  crumb: string
  eyebrow: string
  h1: string
  h1Em?: string
  /** 1–2 short sentences. May contain simple <a href> links. */
  intro: string
  badges: string[]
  /** Show the Diwali date / order-by / dispatch strip under the hero */
  diwaliStrip?: boolean
  quickAnswer: string
  trust?: string[]
  picks?: PickSectionConfig[]
  /** Label for the product count in the hero, e.g. "picks" or "gifts" */
  picksNoun?: string
  ideas?: { id: string; title: string; intro: string; items: Idea[] }
  table?: { id: string; title: string; intro: string; caption: string; columns: string[]; rows: string[][] }
  tips?: { id: string; title: string; intro?: string; items: TitledItem[] }
  steps?: { id: string; title: string; intro?: string; items: TitledItem[] }
  /** A plain-language disclosure or note box, e.g. on the company comparison page */
  note?: { title: string; text: string }
  faqs: FaqItem[]
  quote: { title: string; subtitle: string; occasion: string; cta: string }
  related: RelatedLink[]
  updated: string
  published: string
}
