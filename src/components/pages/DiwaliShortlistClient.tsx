'use client'

import { useSyncExternalStore } from 'react'
import { useCartStore } from '@/lib/cartStore'
import {
  DAMAGE_POLICY,
  DIWALI_DATE_LABEL,
  GSTIN,
  MOQ,
  ORDER_BY,
  PAYMENT_TERMS,
  QUOTE_VALIDITY,
  formatPrice,
} from '@/components/pages/diwaliHubData'
import './diwali-shortlist.css'

const subscribeNoop = () => () => {}

// Printable view of the session pack. "Download PDF" uses the browser's
// print-to-PDF, which keeps the page dependency-free and the PDF selectable.
export default function DiwaliShortlistClient() {
  // The pack lives in sessionStorage, so render it on the client only.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false)
  const items = useCartStore(s => s.items)
  const list = mounted ? items : []
  const total = list.reduce((sum, i) => sum + i.price * Math.max(i.quantity, i.moq || 1), 0)
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <main className="dsl">
      <div className="dsl-actions">
        <a href="/diwali-corporate-gifts#hampers" className="dsl-btn dsl-btn--ghost">← Back to Diwali gifts</a>
        {list.length > 0 && (
          <button type="button" className="dsl-btn" onClick={() => window.print()}>
            Download PDF
          </button>
        )}
      </div>

      <header className="dsl-head">
        {/* eslint-disable-next-line @next/next/no-img-element -- print view, plain img keeps it simple */}
        <img src="/mintbox-logo.webp" alt="MintBox" className="dsl-logo" />
        <div>
          <h1>Diwali Gift Shortlist 2026</h1>
          <p>Prepared {mounted ? today : ''} · themintbox.in/diwali-corporate-gifts</p>
        </div>
      </header>

      {mounted && list.length === 0 ? (
        <p className="dsl-empty">
          Your pack is empty. <a href="/diwali-corporate-gifts#hampers">Add gifts from the Diwali collection</a>, then come back
          here to download your shortlist.
        </p>
      ) : (
        <table className="dsl-table">
          <thead>
            <tr>
              <th scope="col" className="dsl-img-col"><span className="dsl-sr">Image</span></th>
              <th scope="col">Gift</th>
              <th scope="col" className="dsl-num">Unit price</th>
              <th scope="col" className="dsl-num">Qty</th>
              <th scope="col" className="dsl-num">Amount</th>
            </tr>
          </thead>
          <tbody>
            {list.map(i => {
              const qty = Math.max(i.quantity, i.moq || 1)
              return (
                <tr key={i.id}>
                  <td className="dsl-img-col">
                    {i.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={i.imageUrl} alt="" width={64} height={64} />
                    )}
                  </td>
                  <td>
                    <div className="dsl-name">{i.name}</div>
                    <div className="dsl-cat">{i.categoryName}</div>
                  </td>
                  <td className="dsl-num">{formatPrice(i.price)}</td>
                  <td className="dsl-num">{qty}</td>
                  <td className="dsl-num">{formatPrice(i.price * qty)}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="dsl-num">Estimated total, ex GST</td>
              <td className="dsl-num"><strong>{formatPrice(total)}</strong></td>
            </tr>
          </tfoot>
        </table>
      )}

      <section className="dsl-notes">
        <h2>Terms at a glance</h2>
        <ul>
          <li>Indicative per-unit prices at the {MOQ}-unit minimum, exclusive of GST. Logo branding and delivery are quoted separately. Volume pricing applies at higher quantities.</li>
          <li>{QUOTE_VALIDITY}</li>
          <li>Diwali is on {DIWALI_DATE_LABEL}. Confirm by {ORDER_BY.long} for guaranteed delivery anywhere in India.</li>
          <li>Payment: {PAYMENT_TERMS}</li>
          <li>Damage: {DAMAGE_POLICY}</li>
        </ul>
        <p className="dsl-contact">
          MintBox · 2nd Floor, Sobha Alexander Plaza, Ashok Nagar, Bengaluru 560 025 · GSTIN {GSTIN} · +91 98865 37631 · hello@themintbox.in
        </p>
      </section>
    </main>
  )
}
