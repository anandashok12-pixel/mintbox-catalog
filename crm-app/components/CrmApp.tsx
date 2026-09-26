'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ApiError, getCurrentUser, getDeals, getWhatsappMessages, getWhatsappSession, login as payloadLogin, updateDeal } from '@/lib/payload'
import type { Deal, Message, Stage, User, WhatsappSession } from '@/lib/types'
import { AnalyticsIcon, BoardIcon, LogOutIcon, PlusIcon, QueueIcon, RefreshIcon, SearchIcon, WhatsAppIcon } from './Icons'
import { LoginScreen } from './LoginScreen'
import { QueueView } from './QueueView'
import { BoardView } from './BoardView'
import { DealDrawer } from './DealDrawer'
import { WhatsappView } from './WhatsappView'
import { NewDealModal } from './NewDealModal'
import { AnalyticsView } from './AnalyticsView'

const TOKEN_KEY = 'mintbox-crm-token'

export function CrmApp() {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [deals, setDeals] = useState<Deal[]>([])
  const [selectedDealId, setSelectedDealId] = useState<string | number | null>(null)
  const [view, setView] = useState<'queue' | 'board' | 'whatsapp' | 'analytics'>('board')
  const [search, setSearch] = useState('')
  const [whatsappSession, setWhatsappSession] = useState<WhatsappSession | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [whatsappError, setWhatsappError] = useState('')
  const [whatsappLoading, setWhatsappLoading] = useState(false)
  const [booting, setBooting] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [showNewDeal, setShowNewDeal] = useState(false)

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setUser(null)
    setDeals([])
    setMessages([])
    setWhatsappSession(null)
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

  const loadWhatsapp = useCallback(async (activeToken: string) => {
    setWhatsappLoading(true)
    try {
      const [session, rows] = await Promise.all([
        getWhatsappSession(activeToken),
        getWhatsappMessages(activeToken),
      ])
      setWhatsappSession(session)
      setMessages(rows)
      setWhatsappError('')
    } catch (cause) {
      if (cause instanceof ApiError && cause.status === 401) logout()
      else setWhatsappError(cause instanceof Error ? cause.message : 'Could not load WhatsApp status')
    } finally {
      setWhatsappLoading(false)
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
        void loadWhatsapp(stored)
      } catch {
        sessionStorage.removeItem(TOKEN_KEY)
      } finally {
        setBooting(false)
      }
    }

    void restoreSession()
  }, [loadWhatsapp])

  async function handleLogin(email: string, password: string) {
    const result = await payloadLogin(email, password)
    sessionStorage.setItem(TOKEN_KEY, result.token)
    setToken(result.token)
    setUser(result.user)
    await Promise.all([loadDeals(result.token), loadWhatsapp(result.token)])
  }

  async function refresh() {
    if (!token) return
    setRefreshing(true)
    try { await Promise.all([loadDeals(token), loadWhatsapp(token)]) } finally { setRefreshing(false) }
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

  function dealCreated(deal: Deal) {
    setDeals((current) => [deal, ...current])
    setShowNewDeal(false)
    setSelectedDealId(deal.id)
  }

  async function moveDeal(deal: Deal, stage: Stage, lostReason?: string) {
    await patchDeal(deal, {
      stage,
      stageSetManually: true,
      ...(stage === 'lost' ? { lostReason: lostReason || deal.lostReason || null } : { lostReason: null }),
    })
  }

  const filteredDeals = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return deals
    return deals.filter((deal) => {
      const contact = typeof deal.contact === 'object' ? deal.contact : null
      return [deal.title, contact?.name, contact?.company, contact?.email, contact?.phoneE164, deal.occasion]
        .some((value) => value?.toLowerCase().includes(query))
    })
  }, [deals, search])

  if (booting) return <div className="boot-screen"><span className="brand-mark">M</span><p>Preparing your desk</p></div>
  if (!token || !user) return <LoginScreen onLogin={handleLogin} />

  const selectedDeal = selectedDealId == null ? null : deals.find((deal) => deal.id === selectedDealId) || null

  const viewMeta = {
    board: { title: 'Deals', subtitle: `${filteredDeals.length} records` },
    queue: { title: 'Priority queue', subtitle: 'Work that needs attention' },
    whatsapp: { title: 'WhatsApp mirror', subtitle: `${messages.length} captured messages` },
    analytics: { title: 'Analytics', subtitle: 'Pipeline and activity' },
  }[view]

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="sidebar-logo" title="MintBox CRM">MB</div>
        <nav aria-label="CRM sections">
          <button className={view === 'board' ? 'active' : ''} onClick={() => setView('board')} title="Deals"><BoardIcon /><span>Deals</span></button>
          <button className={view === 'queue' ? 'active' : ''} onClick={() => setView('queue')} title="Priority queue"><QueueIcon /><span>Queue</span></button>
          <button className={view === 'whatsapp' ? 'active' : ''} onClick={() => setView('whatsapp')} title="WhatsApp mirror">
            <WhatsAppIcon /><span>WhatsApp</span>
            {whatsappSession?.status !== 'connected' && <i className="nav-alert" />}
          </button>
          <button className={view === 'analytics' ? 'active' : ''} onClick={() => setView('analytics')} title="Analytics"><AnalyticsIcon /><span>Analytics</span></button>
        </nav>
        <button className="sidebar-user" title={user.email}>{(user.name || user.email).slice(0, 1).toUpperCase()}</button>
      </aside>

      <div className="app-workspace">
        <header className="app-header">
          <div className="header-title"><h1>{viewMeta.title}</h1><span>{viewMeta.subtitle}</span></div>
          <label className="global-search"><SearchIcon /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search deals and contacts" /><kbd>⌘ K</kbd></label>
          <div className="header-actions">
            <button className="toolbar-button new-deal-button" onClick={() => setShowNewDeal(true)}><PlusIcon /><span>New deal</span></button>
            <button className={`icon-button ${refreshing ? 'spinning' : ''}`} onClick={refresh} disabled={refreshing} aria-label="Refresh data"><RefreshIcon /></button>
            <div className="user-chip"><span>{(user.name || user.email).slice(0, 1).toUpperCase()}</span><div><strong>{user.name || 'Admin'}</strong><small>{user.email}</small></div></div>
            <button className="icon-button" onClick={logout} aria-label="Sign out"><LogOutIcon /></button>
          </div>
        </header>

        {error && <div className="error-banner" role="alert"><span>{error}</span><button onClick={() => setError('')}>Dismiss</button></div>}
        <main className="app-main">
          {view === 'queue' && <QueueView deals={filteredDeals} onOpen={(deal) => setSelectedDealId(deal.id)} onSnooze={snooze} />}
          {view === 'board' && <BoardView deals={filteredDeals} onOpen={(deal) => setSelectedDealId(deal.id)} onMove={moveDeal} />}
          {view === 'whatsapp' && <WhatsappView session={whatsappSession} messages={messages} loading={whatsappLoading} error={whatsappError} onRefresh={() => token ? loadWhatsapp(token) : Promise.resolve()} />}
          {view === 'analytics' && <AnalyticsView deals={deals} messages={messages} whatsappSession={whatsappSession} />}
        </main>
      </div>
      <DealDrawer key={selectedDeal?.id ?? 'none'} deal={selectedDeal} onClose={() => setSelectedDealId(null)} onPatch={(patch) => selectedDeal ? patchDeal(selectedDeal, patch) : Promise.resolve()} />
      {showNewDeal && token && <NewDealModal token={token} onClose={() => setShowNewDeal(false)} onCreated={dealCreated} />}
    </div>
  )
}
