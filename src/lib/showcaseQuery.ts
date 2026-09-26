// Field lists for content-page product queries. Content pages hand every
// in-stock product to ContentProductShowcase (client-side tabs, price filter
// and search), so the whole list is serialised into the page. Fetch only what
// the showcase card and ProductModal read — keep in sync with the `Product`
// and `Category` interfaces in src/components/content/ContentProductShowcase.tsx.
export const SHOWCASE_PRODUCT_SELECT = {
  name: true,
  price: true,
  emoji: true,
  image: true,
  description: true,
  features: true,
  moq: true,
  customisable: true,
  inStock: true,
  category: true,
} as const

export const SHOWCASE_CATEGORY_SELECT = {
  name: true,
  slug: true,
  emoji: true,
} as const

// Shape of the populated relations (depth: 1). The media `url` is computed in
// an afterRead hook from `filename`, so both must be selected.
export const SHOWCASE_POPULATE = {
  categories: SHOWCASE_CATEGORY_SELECT,
  media: { url: true, filename: true },
} as const
