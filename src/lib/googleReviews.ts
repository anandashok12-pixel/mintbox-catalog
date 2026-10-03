/**
 * Google reviews for the MintBox Business Profile, via the Places API (New).
 * Shared by /api/google-reviews (client widget) and server-rendered pages.
 *
 * Needs GOOGLE_PLACES_API_KEY. Without a key, or if Google errors, returns an
 * empty payload so callers can hide their reviews section.
 */
const REVALIDATE_SECONDS = 86400

// "MintBox | Corporate Gifting Solutions In Bangalore", Ashok Nagar. Public
// identifier, safe to keep in code.
const MINTBOX_PLACE_ID = 'ChIJOb6FsZgXrjsRMOBsT4AXoMo'

export interface GoogleReview {
  author: string
  authorUrl: string | null
  photo: string | null
  rating: number
  text: string
  when: string
  url: string | null
}

export interface GoogleReviewsPayload {
  rating: number | null
  count: number | null
  mapsUrl: string | null
  writeReviewUrl: string | null
  reviews: GoogleReview[]
}

interface PlacesReview {
  rating?: number
  text?: { text?: string }
  originalText?: { text?: string }
  relativePublishTimeDescription?: string
  googleMapsUri?: string
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string }
}

const EMPTY: GoogleReviewsPayload = { rating: null, count: null, mapsUrl: null, writeReviewUrl: null, reviews: [] }

export async function getGoogleReviews(): Promise<GoogleReviewsPayload> {
  const key = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID || MINTBOX_PLACE_ID
  if (!key) return EMPTY

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri',
      },
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (!res.ok) {
      console.error('[google-reviews] Places API error', res.status, (await res.text()).slice(0, 300))
      return EMPTY
    }
    const place = await res.json()

    const reviews: GoogleReview[] = ((place.reviews ?? []) as PlacesReview[])
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? 'Google user',
        authorUrl: r.authorAttribution?.uri ?? null,
        photo: r.authorAttribution?.photoUri ?? null,
        rating: r.rating ?? 0,
        text: (r.originalText?.text ?? r.text?.text ?? '').trim(),
        when: r.relativePublishTimeDescription ?? '',
        url: r.googleMapsUri ?? null,
      }))
      .filter((r) => r.text.length > 0)
      // Top-rated first, then the more detailed review.
      .sort((a, b) => b.rating - a.rating || b.text.length - a.text.length)
      .slice(0, 10)

    return {
      rating: place.rating ?? null,
      count: place.userRatingCount ?? null,
      mapsUrl: place.googleMapsUri ?? null,
      writeReviewUrl: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`,
      reviews,
    }
  } catch (err) {
    console.error('[google-reviews] fetch failed', err)
    return EMPTY
  }
}
