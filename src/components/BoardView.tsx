import React from 'react'
import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { buildBoard } from '@/lib/board'
import { BoardClient } from './BoardClient'

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

  return (
    <div style={{ padding: '2rem' }}>
      {/* Payload's admin theme sets `color` on elements via a global dark-theme
          stylesheet with !important, which beats an inherited inline style -
          React's style objects can't set !important themselves (that only
          works through element.style.setProperty, not property assignment),
          so the board's own light-card colors need their own !important rule. */}
      <style>{`
        .mb-board-column, .mb-board-column * { color: #1a1a1a !important; }
        .mb-board-card, .mb-board-card * { color: #1a1a1a !important; }
      `}</style>
      <h1 style={{ marginBottom: '0.25rem', fontSize: '1.75rem', fontWeight: 700 }}>Pipeline</h1>
      <p style={{ marginBottom: '1.5rem', opacity: 0.6, fontSize: '0.95rem' }}>
        Drag a card to change its stage, or use the dropdown on a card (easier on a phone). A drag always wins over
        what the extractor suggests.
      </p>
      <BoardClient initialColumns={columns} lostReasons={lostReasons} />
    </div>
  )
}
