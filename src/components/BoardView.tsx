import React from 'react'
import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { buildBoard } from '@/lib/board'
import { BoardClient } from './BoardClient'
import { CRM_THEME } from '@/lib/crmTheme'

export async function BoardView() {
  // Same explicit auth gate as QueueView - custom Payload admin views are
  // not auto-protected, and the local API bypasses access control by
  // default. See QueueView.tsx for the full note.
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: await getHeaders() })
  if (!user) {
    redirect('/admin/login?redirect=%2Fadmin%2Fboard')
  }

  const { columns, lostReasons } = await buildBoard()
  const totalDeals = columns.reduce((sum, c) => sum + c.cards.length, 0)
  const totalOpenValue = columns
    .filter((c) => c.stage !== 'won' && c.stage !== 'lost')
    .reduce((sum, c) => sum + c.totalValue, 0)

  return (
    // A full-viewport takeover, not just a themed page: this is the
    // difference between "a screen inside the CMS" and "MintBox's own CRM,
    // which happens to live at this URL". Payload's nav/shell stay in the
    // DOM underneath but are never visible once this mounts.
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        background: CRM_THEME.cream,
        fontFamily: CRM_THEME.fontBody,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Payload's admin theme sets `color` on elements via a global dark-theme
          stylesheet with !important, which beats an inherited inline style -
          React's style objects can't set !important themselves (that only
          works through element.style.setProperty, not property assignment),
          so the board's own colours need their own !important rule. */}
      <style>{`
        .mb-board-root, .mb-board-root * { box-sizing: border-box; }
        .mb-board-column, .mb-board-column *:not(.mb-accent-text) { color: ${CRM_THEME.ink} !important; }
        .mb-board-card, .mb-board-card *:not(.mb-accent-text) { color: ${CRM_THEME.ink} !important; }
      `}</style>

      <header
        style={{
          background: `linear-gradient(135deg, ${CRM_THEME.green}, ${CRM_THEME.greenDeep})`,
          padding: '1rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          boxShadow: CRM_THEME.shadowMd,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.85rem' }}>
          <span
            style={{
              fontFamily: CRM_THEME.fontDisplay,
              fontWeight: 700,
              fontSize: '1.3rem',
              letterSpacing: '0.04em',
              color: CRM_THEME.goldLight,
            }}
          >
            MINTBOX
          </span>
          <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)' }}>CRM &middot; Pipeline</span>
        </div>
        <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)' }}>
          <span>
            <strong style={{ color: '#fff' }}>{totalDeals}</strong> deals
          </span>
          <span>
            <strong style={{ color: '#fff' }}>&#8377;{Math.round(totalOpenValue).toLocaleString('en-IN')}</strong> open
          </span>
        </div>
      </header>

      <div style={{ padding: '0.9rem 1.75rem 0', flexShrink: 0 }}>
        <p style={{ fontSize: '0.85rem', color: CRM_THEME.inkFaint }}>
          Drag a card to a new stage. A drag always wins over what the extractor suggests.
        </p>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '1rem 1.75rem 1.75rem' }}>
        <BoardClient initialColumns={columns} lostReasons={lostReasons} />
      </div>
    </div>
  )
}
