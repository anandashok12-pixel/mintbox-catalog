'use client'

import React, { useState } from 'react'
import './GoogleReviews.css'
import { GOOGLE_REVIEWS, PLACE, type GoogleReview } from '@/data/googleReviews'

/* ------------------------------------------------------------------
   Helpers
------------------------------------------------------------------ */

/** Deterministic avatar tint so a reviewer always gets the same colour. */
const AVATAR_TINTS = [
  '#1B4D3E',
  '#B8972E',
  '#2A7A57',
  '#8C6D1F',
  '#14483A',
  '#A67C00',
]

function tintFor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0
  return AVATAR_TINTS[Math.abs(hash) % AVATAR_TINTS.length]
}

function initialsFor(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

/** "September 2026" — no relative drift, no fake day-precision. */
function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`)
  return d.toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/* ------------------------------------------------------------------
   Sub-components
------------------------------------------------------------------ */

function Stars({ rating, size = 15 }: { rating: number; size?: number }) {
  return (
    <span
      className="gr-stars"
      role="img"
      aria-label={`${rating} out of 5 stars`}
      style={{ ['--gr-star-size' as string]: `${size}px` }}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={i <= rating ? 'gr-star gr-star--on' : 'gr-star'}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M12 2.6l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.4l-5.8 3.06 1.11-6.46-4.7-4.58 6.49-.94L12 2.6z" />
        </svg>
      ))}
    </span>
  )
}

/** Google's four-colour G, used to attribute the review source. */
function GoogleGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg
      className="gr-glyph"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  )
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = review.text.length > 180

  return (
    <li className="gr-card">
      <div className="gr-card-head">
        <span
          className="gr-avatar"
          style={{ background: tintFor(review.author) }}
          aria-hidden="true"
        >
          {initialsFor(review.author)}
        </span>
        <div className="gr-card-who">
          <span className="gr-name">{review.author}</span>
          <span className="gr-date">{formatDate(review.date)}</span>
        </div>
        <GoogleGlyph size={18} />
      </div>

      <Stars rating={review.rating} />

      <blockquote
        className={`gr-text${isLong && !expanded ? ' gr-text--clamped' : ''}`}
      >
        {review.text}
        {review.truncated && <span className="gr-ellipsis">…</span>}
      </blockquote>

      <div className="gr-card-foot">
        {isLong && !review.truncated && (
          <button
            type="button"
            className="gr-more"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
        {review.truncated && (
          <a
            className="gr-more"
            href={PLACE.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Read full review on Google
          </a>
        )}
      </div>

      {review.ownerReply && (
        <div className="gr-reply">
          <span className="gr-reply-label">Response from MintBox</span>
          <p className="gr-reply-text">{review.ownerReply}</p>
        </div>
      )}
    </li>
  )
}

/* ------------------------------------------------------------------
   Main component
------------------------------------------------------------------ */

export interface GoogleReviewsProps {
  /** Section eyebrow above the headline. */
  eyebrow?: string
  /** Section headline. */
  headline?: React.ReactNode
  /** Cream card deck on forest (`dark`) or forest cards on cream (`light`). */
  theme?: 'light' | 'dark'
  /** How many cards to show before the "Show all" button. 0 shows every review. */
  initialCount?: number
  /**
   * Emit Review / AggregateRating JSON-LD for this section.
   *
   * OFF BY DEFAULT AND YOU SHOULD PROBABLY LEAVE IT OFF. Google's review
   * snippet guidelines disallow marking up reviews that were collected on
   * another platform and republished, and also disallow "self-serving"
   * reviews about the business on its own Organization/LocalBusiness
   * markup. Turning this on risks a manual action against the whole site
   * for structured-data spam. The reviews still work as on-page trust
   * content without it.
   */
  includeSchema?: boolean
}

export function GoogleReviews({
  eyebrow = 'Reviewed on Google',
  headline = (
    <>
      Don&apos;t take our word for it. <em>Take theirs.</em>
    </>
  ),
  theme = 'dark',
  initialCount = 6,
  includeSchema = false,
}: GoogleReviewsProps) {
  const [showAll, setShowAll] = useState(initialCount === 0)
  const hasMore = initialCount > 0 && GOOGLE_REVIEWS.length > initialCount
  const visible =
    showAll || !hasMore ? GOOGLE_REVIEWS : GOOGLE_REVIEWS.slice(0, initialCount)

  const schema = includeSchema
    ? {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'MintBox',
        address: PLACE.address,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: PLACE.rating,
          reviewCount: PLACE.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
        review: GOOGLE_REVIEWS.map((r) => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.author },
          datePublished: r.date,
          reviewBody: r.text,
          reviewRating: {
            '@type': 'Rating',
            ratingValue: r.rating,
            bestRating: 5,
            worstRating: 1,
          },
        })),
      }
    : null

  return (
    <section
      id="google-reviews"
      className={`gr-section gr-section--${theme}`}
      aria-labelledby="gr-heading"
    >
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      <div className="gr-inner">
        <header className="gr-head">
          <div className="gr-head-copy">
            <span className="gr-eyebrow">{eyebrow}</span>
            <h2 className="gr-headline" id="gr-heading">
              {headline}
            </h2>
          </div>

          <div className="gr-score" aria-label={`Rated ${PLACE.rating} out of 5 on Google from ${PLACE.reviewCount} reviews`}>
            <GoogleGlyph size={26} />
            <span className="gr-score-num">{PLACE.rating.toFixed(1)}</span>
            <span className="gr-score-meta">
              <Stars rating={Math.round(PLACE.rating)} size={16} />
              <span className="gr-score-count">
                {PLACE.reviewCount} Google reviews
              </span>
            </span>
          </div>
        </header>

        <ul className="gr-grid">
          {visible.map((review) => (
            <ReviewCard key={`${review.author}-${review.date}`} review={review} />
          ))}
        </ul>

        <div className="gr-actions">
          {hasMore && !showAll && (
            <button
              type="button"
              className="gr-btn gr-btn--ghost"
              onClick={() => setShowAll(true)}
            >
              Show all {GOOGLE_REVIEWS.length} reviews
            </button>
          )}
          <a
            className="gr-btn gr-btn--solid"
            href={PLACE.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Read them on Google
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default GoogleReviews
