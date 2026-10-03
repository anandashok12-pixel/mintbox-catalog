/**
 * Google reviews for the MintBox Business Profile, via the Places API (New).
 *
 * Needs GOOGLE_PLACES_API_KEY (a key restricted to the Places API). The
 * place defaults to the MintBox Business Profile; GOOGLE_PLACE_ID overrides
 * it. Without a key, or if Google errors, this returns an empty list and the
 * reviews widget renders nothing.
 *
 * Google returns at most 5 reviews per place ("most relevant"), so the widget
 * shows up to that many. Cached for a day to stay well inside the free tier.
 */
import { getGoogleReviews } from '@/lib/googleReviews'

export const revalidate = 86400

export type { GoogleReview, GoogleReviewsPayload } from '@/lib/googleReviews'

export async function GET() {
  return Response.json(await getGoogleReviews())
}
