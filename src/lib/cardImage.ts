/**
 * Card thumbnails for product images.
 *
 * Product originals in Blob are ~1250px and 150-800 KB, far too heavy for a
 * ~240px catalogue card. Each one gets a 600px WebP sibling stored at
 * `card/<original filename>.webp` in the same Blob store, so the thumbnail URL
 * can be derived from the original URL with no extra DB column and no
 * dependency on the Vercel Image Optimization quota.
 *
 * Thumbnails are written by src/lib/cardThumb.ts (Media hook for new uploads,
 * scripts/backfill-card-thumbs.ts for existing ones). This file is
 * client-safe: URL maths only.
 */
export const CARD_PREFIX = 'card/'
export const CARD_WIDTH = 600

const BLOB_URL = /^(https:\/\/[a-z\d]+\.public\.blob\.vercel-storage\.com)\/(.+)$/i

/** Blob pathname of the card thumbnail for a media filename. */
export const cardPathname = (filename: string): string => `${CARD_PREFIX}${filename}.webp`

/**
 * Thumbnail URL for a public Blob image URL, or null when the URL is not a
 * Blob original (relative /api/media paths, static assets, SVGs).
 */
export function cardImageUrl(url: string | null | undefined): string | null {
  if (!url) return null
  const match = url.match(BLOB_URL)
  if (!match) return null
  const [, origin, path] = match
  if (path.startsWith(CARD_PREFIX) || /\.svg$/i.test(path)) return null
  return `${origin}/${CARD_PREFIX}${path}.webp`
}
