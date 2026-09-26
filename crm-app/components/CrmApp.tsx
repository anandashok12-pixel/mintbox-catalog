'use client'

import { useCallback, useEffect, useState } from 'react'
import { ApiError, getCurrentUser, getDeals, login as payloadLogin, updateDeal } from '@/lib/payload'
import type { Deal, Stage, User } from '@/lib/types'
import { BoardIcon, LogOutIcon, QueueIcon, RefreshIcon } from './Icons'
import { LoginScreen } from './LoginScreen'
import { QueueView } from './QueueView'
import { BoardView } from './BoardView'
import { DealDrawer } from './DealDrawer'

const TOKEN_KEY = 'mintbox-crm-token'

export function CrmApp() {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [deals, setDeals] = useState<Deal[]>([])
  const [selectedDealId, setSelectedDealId] = useState<string | number | null>(null)
  const [view, setView] = useState<'queue' | 'board'>('queue')
  const [booting, setBooting] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
    setDeals([])
    setSelectedDealId(null)
  }, [])

  const loadDeals = useCallback(async (activeToken: string) => {
    try {
      const rows = await getDeals(activeToken)
      setDeals(rows)
      setError('')
    } catch (cause) {
      if (cause instanceof ApiError && cause.status === 401) logout()
      else setError(cause instanceof Error ? cause.message : 'Could not load deals')
      throw cause
    }
  }, [logout])

  useEffect(() => {
    async function restoreSession() {
      const stored = sessionStorage.getItem(TOKEN_KEY)
      if (!stored) {
        setBooting(false)
        return
      }
      try {
        const [currentUser, rows] = await Promise.all([getCurrentUser(stored), getDeals(stored)])
        setToken(stored)
        setUser(currentUser)
        setDeals(rows)
      } catch {
        sessionStorage.removeItem(TOKEN_KEY)
      } finally {
        setBooting(false)
      }
    }

    void restoreSession()
  }, [])

  async function handleLogin(email: string, password: string) {
    const result = await payloadLogin(email, password)
    sessionStorage.setItem(TOKEN_KEY, result.token)
    setToken(result.token)
    setUser(result.user)
    await loadDeals(result.token)
  }

  async function refresh() {
    if (!token) return
    setRefreshing(true)
    try { await loadDeals(token) } finally { setRefreshing(false) }
  }

  async function patchDeal(deal: Deal, patch: Partial<Deal>) {
    if (!token) return
    setDeals((current) => current.map((item) => item.id === deal.id ? { ...item, ...patch } : item))
    try {
      const updated = await updateDeal(token, deal.id, patch)
      setDeals((current) => current.map((item) => item.id === deal.id ? updated : item))
    } catch (cause) {
      await loadDeals(token).catch(() => undefined)
      setError(cause instanceof Error ? cause.message : 'Could not save the deal')
      throw cause
    }
  }

  async function snooze(deal: Deal, days: number) {
    await patchDeal(deal, { nextActionAt: new Date(Date.now() + days * 86_400_000).toISOString() })
  }

  async function moveDeal(deal: Deal, stage: Stage, lostReason?: string) {
    await patchDeal(deal, {
      stage,
      stageSetManually: true,
      ...(stage === 'lost' ? { lostReason: lostReason || deal.lostReason || null } : { lostReason: null }),
    })
  }

  if (booting) return <div className="boot-screen"><span className="brand-mark">M</span><p>Preparing your desk</p></div>
  if (!token || !user) return <LoginScreen onLogin={handleLogin} />

  const selectedDeal = selectedDealId == null ? null : deals.find((deal) => deal.id === selectedDealId) || null

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-brand"><span className="brand-mark">M</span><div><strong>MintBox</strong><small>Sales desk</small></div></div>
        <nav className="view-tabs" aria-label="CRM views">
          <button className={view === 'queue' ? 'active' : ''} onClick={() => setView('queue')}><QueueIcon /><span>Queue</span></button>
          <button className={view === 'board' ? 'active' : ''} onClick={() => setView('board')}><BoardIcon /><span>Pipeline</span></button>
        </nav>
        <div className="header-actions">
          <button className={`icon-button ${refreshing ? 'spinning' : ''}`} onClick={refresh} disabled={refreshing} aria-label="Refresh data"><RefreshIcon /></button>
          <div className="user-chip"><span>{(user.name || user.email).slice(0, 1).toUpperCase()}</span><div><strong>{user.name || 'MintBox admin'}</strong><small>{user.email}</small></div></div>
          <button className="icon-button" onClick={logout} aria-label="Sign out"><LogOutIcon /></button>
        </div>
      </header>

      {error && <div className="error-banner" role="alert"><span>{error}</span><button onClick={() => setError('')}>Dismiss</button></div>}
      <main className="app-main">
        {view === 'queue'
          ? <QueueView deals={deals} onOpen={(deal) => setSelectedDealId(deal.id)} onSnooze={snooze} />
          : <BoardView deals={deals} onOpen={(deal) => setSelectedDealId(deal.id)} onMove={moveDeal} />}
      </main>
      <DealDrawer deal={selectedDeal} onClose={() => setSelectedDealId(null)} />
    </div>
  )
}
