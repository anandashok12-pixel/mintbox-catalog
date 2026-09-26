/* ============================================================
   MINTBOX — Google Business Profile reviews
   ============================================================

   Source of truth for the <GoogleReviews /> component.

   WHY THIS IS A STATIC FILE AND NOT A LIVE API CALL
   -------------------------------------------------
   The Google Places API "Place Details" endpoint returns a maximum of
   FIVE reviews per place, chosen by Google, with no way to page through
   the rest. We have 12. Fetching live would therefore show *fewer*
   reviews than this file, cost money per request, and add a runtime
   dependency on a third-party API for content that changes a few times
   a year.

   HOW TO REFRESH
   --------------
   1. Open the listing's review list:
      https://maps.google.com/?cid=14600695831790936112
   2. Add any new reviews to the array below, newest first.
   3. Update `PLACE.rating` and `PLACE.reviewCount` to match the header
      figure Google shows.

   Review text is reproduced verbatim, including the reviewers' own
   spelling and punctuation. Three reviews were clamped by Google in the
   listing UI; those carry `truncated: true` and the card links out to
   the full text rather than pretending the excerpt is complete.
   ============================================================ */

export interface GoogleReview {
  /** Reviewer's display name as shown on Google. */
  author: string
  /** Star rating, 1-5. */
  rating: number
  /** ISO date. Approximated from Google's relative timestamps at capture. */
  date: string
  /** Review body, verbatim. */
  text: string
  /** True when Google's UI clamped the text and the tail is unavailable. */
  truncated?: boolean
  /** MintBox's public reply, when there is one. */
  ownerReply?: string
}

export interface GooglePlace {
  name: string
  rating: number
  reviewCount: number
  /** Canonical listing link (CID form — stable, survives name changes). */
  url: string
  /** Deep link to the review list, sorted by Google's default relevance. */
  reviewsUrl: string
  /** Address shown under the listing. */
  address: string
}

/** Captured 2026-09-12 from the MintBox Google Business Profile. */
export const REVIEWS_CAPTURED_ON = '2026-09-12'

export const PLACE: GooglePlace = {
  name: 'MintBox | Corporate Gifting Solutions In Bangalore',
  rating: 4.9,
  reviewCount: 12,
  url: 'https://maps.google.com/?cid=14600695831790936112',
  reviewsUrl:
    'https://www.google.com/maps/place/MintBox/data=!4m8!3m7!1s0x3bae1798b185be39:0xcaa017804f6ce030!8m2!3d12.9707959!4d77.610337!9m1!1b1!16s%2Fg%2F11z3blr18n',
  address:
    '2nd Floor, Sobha Alexander Plaza, 16/2, Commissariat Rd, Ashok Nagar, Bengaluru, Karnataka 560025',
}

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    author: 'Abhishek Abhi',
    rating: 5,
    date: '2026-09-11',
    text: 'For years I have been organising corporate events and arranging gifts for the clients but for the very first time I found Mintbox and half of my task was done. team did an excellent job….',
  },
  {
    author: 'Ranjith Kumar',
    rating: 5,
    date: '2026-09-11',
    text: 'Recently we had employee wellness initiative and for that we ordered customized water bottles from Mintbox. Really impressed with their quality. The printing of our company logo was clear and the quality of bottle was good…',
  },
  {
    author: 'Tirumal B',
    rating: 5,
    date: '2026-09-09',
    text: 'We got a recommendation of Mintbox from one of our clients. If you are looking for options of premium corporate gifts in MG Road Area then you can definitely trust them.',
  },
  {
    author: 'Akash A',
    rating: 5,
    date: '2026-09-09',
    text: 'Overall had very good experience with Mintbox. Best place to get a quality collection of premium corporate gifts in Bengaluru. We ordered customised gifts for a business event. Personally, can say their quality and packaging is excellent!',
  },
  {
    author: 'Rima Choudhury',
    rating: 5,
    date: '2026-09-06',
    text: 'This was our third order from Mintbox and everytime they impressed us! MintBox is one of the reliable corporate gift suppliers in Bengaluru and for sure for all our future events they are the one on whom we are dependable. Unlike other',
    truncated: true,
  },
  {
    author: 'Harsh Gupta',
    rating: 5,
    date: '2026-09-05',
    text: 'For our client appreciation event we were looking for some options of premium corporate gifts in Bengaluru. got in touch with them & were thoroughly impressed with their support for helping us select gifts as per our branding requirements.',
    truncated: true,
  },
  {
    author: 'Rahul Adukadukkam',
    rating: 4,
    date: '2026-07-12',
    text: 'Ordered a batch of 40 gift boxes for our annual day hampers the whole process was very smooth. Sent them a rough brief on WhatsApp, they came back within the same day with different options at various price points.',
    truncated: true,
    ownerReply: 'Thank you Rahul sir for your feedback',
  },
  {
    author: 'Ishan Vinod',
    rating: 5,
    date: '2026-06-12',
    text: 'we got client gifts done through mintbox and the packaging quality is genuinely top notch. that gold ribbon thing is such a nice touch. communication was smooth, got replies fast even on weekend. only thing is i wish there were more options under the budget category but overall really happy',
    ownerReply: 'Thank you Ishan for your feedback',
  },
  {
    author: 'Remesh Kumar P',
    rating: 5,
    date: '2026-06-12',
    text: 'Excellent Service, wide range of products to select from and highly professional team.',
    ownerReply: 'Thank you Remesh sir for your kind words',
  },
  {
    author: 'Lalu John',
    rating: 5,
    date: '2026-06-12',
    text: 'Excellent service, reasonable prices and a lot of selections',
  },
  {
    author: 'Aswathy Ashok',
    rating: 5,
    date: '2026-04-12',
    text: 'I recently had a wonderful experience with this gifting company and would highly recommend them to anyone looking for thoughtful and beautifully curated gifts. The variety of options available made it easy to find something perfect for every occasion.',
    ownerReply: 'Thank you very much Aswathy maam for your feedback',
  },
  {
    author: 'Vineetha A',
    rating: 5,
    date: '2026-04-12',
    text: 'Anand has explained the gifting options very well. High quality packaging, premium products and gave a very premium experience to our clients',
    ownerReply: 'Thank you Ms. Vineetha for your feedback',
  },
]
