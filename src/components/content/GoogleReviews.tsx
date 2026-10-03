'use client'

import { useEffect, useState } from 'react'
import type { GoogleReviewsPayload } from '@/app/(main)/api/google-reviews/route'
import './social-proof.css'

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="sp-stars" aria-label={`${rating} out of 5 stars`} role="img">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"
            fill={i <= Math.round(rating) ? '#F4B400' : 'rgba(0,0,0,0.12)'}
          />
        </svg>
      ))}
    </span>
  )
}

const GoogleMark = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
)

/**
 * Scrolling carousel of Google reviews, loaded from /api/google-reviews.
 * Renders nothing until reviews arrive, or if there are none.
 */
export default function GoogleReviews() {
  const [data, setData] = useState<GoogleReviewsPayload | null>(null)

  useEffect(() => {
    let alive = true
    fetch('/api/google-reviews')
      .then((r) => (r.ok ? r.json() : null))
      .then((d: GoogleReviewsPayload | null) => {
        if (alive) setData(d)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  if (!data || data.reviews.length === 0) return null
  // Too few cards to fill a loop: show them as a static row instead.
  const loop = data.reviews.length >= 3

  return (
    <section className="sp-reviews" aria-labelledby="sp-reviews-title">
      <div className="sp-reviews-head">
        <h2 id="sp-reviews-title" className="sp-reviews-title">What clients say on Google</h2>
        {data.rating !== null && (
          <a className="sp-reviews-summary" href={data.mapsUrl ?? undefined} target="_blank" rel="noopener noreferrer">
            <GoogleMark />
            <strong>{data.rating.toFixed(1)}</strong>
            <Stars rating={data.rating} />
            {data.count !== null && <span>{data.count} reviews</span>}
          </a>
        )}
      </div>

      <div className={loop ? 'sp-marquee sp-marquee--slow' : 'sp-marquee sp-marquee--static'}>
        {(loop ? [0, 1] : [0]).map((copy) => (
          <ul key={copy} className="sp-marquee-track" aria-hidden={copy === 1 ? true : undefined}>
            {data.reviews.map((r, i) => (
              <li key={`${r.author}-${i}`} className="sp-review">
                <div className="sp-review-top">
                  {r.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element -- Google-hosted avatar, shown as supplied
                    <img src={r.photo} alt="" width={36} height={36} loading="lazy" referrerPolicy="no-referrer" />
                  ) : (
                    <span className="sp-review-initial" aria-hidden="true">{r.author.charAt(0)}</span>
                  )}
                  <div>
                    <div className="sp-review-author">{r.author}</div>
                    <div className="sp-review-meta">
                      <Stars rating={r.rating} size={12} />
                      <span>{r.when}</span>
                    </div>
                  </div>
                </div>
                <p className="sp-review-text">{r.text}</p>
                {r.url && (
                  <a className="sp-review-link" href={r.url} target="_blank" rel="noopener noreferrer" tabIndex={copy === 1 ? -1 : undefined}>
                    Read on Google
                  </a>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>

      <div className="sp-reviews-actions">
        {data.mapsUrl && (
          <a href={data.mapsUrl} target="_blank" rel="noopener noreferrer" className="sp-btn">
            See all reviews on Google
          </a>
        )}
        {data.writeReviewUrl && (
          <a href={data.writeReviewUrl} target="_blank" rel="noopener noreferrer" className="sp-btn sp-btn--ghost">
            Write a review
          </a>
        )}
      </div>
    </section>
  )
}
