'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Check, Plus } from '@phosphor-icons/react'
import ProductModal from '@/components/modals/ProductModal'
import { formatPrice, type TierKey } from '@/components/pages/diwaliHubData'
import { PRIMARY_CTA } from './offer'
import { useQuote } from './quoteStore'

export interface SlimHamper {
  id: string
  name: string
  price: number
  image: string | null
  imageLarge: string | null
  description: string
  items: string[]
  moq: number
  customisable: boolean
  tier: TierKey
}

export interface TierTab {
  key: TierKey
  label: string
  title: string
  range: string
  count: number
}

/** Two rows of four; the rest of the band is one tap away, so the page stays short. */
const INITIAL = 8

/**
 * Budget tabs over every hamper in that band, from the live catalogue.
 * Hampers are added to the quote with the + on the photo (several can be
 * added); clicking the photo opens the same product pop-up as the catalogue.
 */
export default function HamperPicker({ tabs, hampers }: { tabs: TierTab[]; hampers: SlimHamper[] }) {
  const firstFull = tabs.find(t => t.key === 'team' && t.count > 0) ?? tabs.find(t => t.count > 0)
  const [active, setActive] = useState<TierKey>(firstFull?.key ?? 'team')
  const [expanded, setExpanded] = useState(false)
  const [open, setOpen] = useState<SlimHamper | null>(null)
  const picked = useQuote(s => s.hampers)
  const toggleHamper = useQuote(s => s.toggleHamper)
  // The tray points back to the form, so hide it while the form is on screen.
  const [formInView, setFormInView] = useState(true)
  useEffect(() => {
    const form = document.getElementById('quote')
    if (!form) return
    const io = new IntersectionObserver(([e]) => setFormInView(e.isIntersecting), { threshold: 0.25 })
    io.observe(form)
    return () => io.disconnect()
  }, [])

  const inTier = hampers.filter(h => h.tier === active)
  const shown = expanded ? inTier : inTier.slice(0, INITIAL)
  const isPicked = (h: SlimHamper) => picked.some(p => p.id === h.id)
  const toggle = (h: SlimHamper) => toggleHamper({ id: h.id, name: h.name, price: h.price }, h.tier)

  const switchTier = (k: TierKey) => {
    setActive(k)
    setExpanded(false)
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
            onClick={() => switchTier(t.key)}
          >
            <span className="dl-tab-label">{t.label}</span>
            <span className="dl-tab-meta">{t.count} hampers</span>
          </button>
        ))}
      </div>

      <div id="dl-hamper-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="dl-hamper-grid">
        {shown.map(h => {
          const added = isPicked(h)
          return (
            <article key={h.id} className={`dl-hamper${added ? ' is-added' : ''}`}>
              <div className="dl-hamper-img">
                <button type="button" className="dl-hamper-open" onClick={() => setOpen(h)} aria-label={`View ${h.name}`}>
                  {h.image ? (
                    <Image src={h.image} alt="" fill sizes="(max-width: 639px) 50vw, (max-width: 1179px) 33vw, 280px" />
                  ) : null}
                  <span className="dl-hamper-hint" aria-hidden="true">
                    View details
                  </span>
                </button>
                <button
                  type="button"
                  className="dl-hamper-add"
                  onClick={() => toggle(h)}
                  aria-pressed={added}
                  aria-label={added ? `Remove ${h.name} from your quote` : `Add ${h.name} to your quote`}
                >
                  {added ? <Check size={18} weight="bold" /> : <Plus size={18} weight="bold" />}
                  <span className="dl-hamper-add-label">{added ? 'Added' : 'Add to quote'}</span>
                </button>
              </div>
              <div className="dl-hamper-body">
                <h3 className="dl-hamper-name">{h.name}</h3>
                <p className="dl-hamper-price">
                  {formatPrice(h.price)} <span>ex GST</span>
                </p>
              </div>
            </article>
          )
        })}
      </div>

      {inTier.length > INITIAL && (
        <div className="dl-more">
          <button type="button" className="dl-btn dl-btn--ghost" onClick={() => setExpanded(e => !e)} aria-controls="dl-hamper-panel">
            {expanded ? 'Show fewer' : `Show all ${inTier.length} in this budget`}
          </button>
        </div>
      )}

      {picked.length > 0 && !formInView && (
        <a href="#quote" className="dl-tray" aria-live="polite">
          <span className="dl-tray-count">{picked.length}</span>
          <span>{picked.length === 1 ? 'hamper' : 'hampers'} in your quote</span>
          <span className="dl-tray-cta">{PRIMARY_CTA}</span>
        </a>
      )}

      {open && (
        <ProductModal
          product={{
            id: open.id,
            name: open.name,
            price: open.price,
            image: open.imageLarge ? { url: open.imageLarge } : open.image ? { url: open.image } : null,
            description: open.description,
            features: open.items.map(feature => ({ feature })),
            moq: open.moq,
            customisable: open.customisable,
            category: '',
          }}
          onClose={() => setOpen(null)}
          action={{
            label: isPicked(open) ? 'Remove from quote' : 'Add to quote',
            onClick: () => toggle(open),
          }}
        />
      )}
    </div>
  )
}
