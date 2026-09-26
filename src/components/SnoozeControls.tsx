'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

/** Client island on an otherwise server-rendered queue row - the only interactive bit. */
export function SnoozeControls({ dealId }: { dealId: string | number }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  const snooze = async (days: number | null) => {
    setPending(true)
    try {
      await fetch(`/api/deals/${dealId}/snooze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ days }),
      })
      router.refresh()
    } finally {
      setPending(false)
    }
  }

  const btnStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    padding: '0.25rem 0.5rem',
    border: '1px solid #ccc',
    borderRadius: 4,
    background: '#fff',
    cursor: 'pointer',
    opacity: pending ? 0.5 : 1,
  }

  return (
    <div style={{ display: 'flex', gap: '0.4rem' }}>
      <button style={btnStyle} disabled={pending} onClick={() => snooze(3)}>
        Snooze 3d
      </button>
      <button style={btnStyle} disabled={pending} onClick={() => snooze(7)}>
        Snooze 1wk
      </button>
    </div>
  )
}
