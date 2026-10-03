'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check } from '@phosphor-icons/react'
import { formatPrice, type TierKey } from '@/components/pages/diwaliHubData'
import { useQuote } from './quoteStore'

export interface SlimHamper {
  id: string
  name: string
  price: number
  image: string | null
  items: string[]
  tier: TierKey
}

export interface TierTab {
  key: TierKey
  label: string
  title: string
  range: string
  count: number
}

/** Budget tabs over every hamper in that band, from the live catalogue. */
export default function HamperPicker({ tabs, hampers }: { tabs: TierTab[]; hampers: SlimHamper[] }) {
  const firstFull = tabs.find(t => t.key === 'team' && t.count > 0) ?? tabs.find(t => t.count > 0)
  const [active, setActive] = useState<TierKey>(firstFull?.key ?? 'team')
  const picked = useQuote(s => s.hamper)
  const setHamper = useQuote(s => s.setHamper)

  const shown = hampers.filter(h => h.tier === active)

  const choose = (h: SlimHamper) => {
    setHamper({ id: h.id, name: h.name, price: h.price }, h.tier)
    const target = document.getElementById('quote')
    target?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div>
      <div className="dl-tabs" role="tablist" aria-label="Budget per gift">
        {tabs.map(t => (
          <button
            key={t.key}
            role="tab"
            id={`tab-${t.key}`}
            aria-selected={active === t.key}
            aria-controls="dl-hamper-panel"
            className="dl-tab"
            disabled={t.count === 0}
            onClick={() => setActive(t.key)}
          >
            <span className="dl-tab-label">{t.label}</span>
            <span className="dl-tab-meta">{t.count} hampers</span>
          </button>
        ))}
      </div>

      <div id="dl-hamper-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="dl-hamper-grid">
        {shown.map(h => {
          const isPicked = picked?.id === h.id
          return (
            <article key={h.id} className="dl-hamper">
              <div className="dl-hamper-img">
                {h.image ? (
                  <Image src={h.image} alt={h.name} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1199px) 33vw, 290px" />
                ) : null}
              </div>
              <div className="dl-hamper-body">
                <h3 className="dl-hamper-name">{h.name}</h3>
                <p className="dl-hamper-price">
                  {formatPrice(h.price)} <span>per gift, ex GST</span>
                </p>
                {h.items.length > 0 && (
                  <details className="dl-hamper-inside">
                    <summary>What is inside</summary>
                    <ul className="dl-hamper-items">
                      {h.items.map(i => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </details>
                )}
                <button
                  type="button"
                  className={`dl-btn dl-btn--ghost dl-btn--block${isPicked ? ' is-picked' : ''}`}
                  onClick={() => choose(h)}
                  aria-pressed={isPicked}
                >
                  {isPicked ? (
                    <>
                      <Check size={16} weight="bold" aria-hidden="true" /> Added to your quote
                    </>
                  ) : (
                    'Choose this hamper'
                  )}
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
