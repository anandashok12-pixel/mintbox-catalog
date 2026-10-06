'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ApiError, refreshSession, createTask, deleteTask, getCurrentUser, getDeals, getEmailMessages, getGmailSync, getTasks, getWhatsappMessages, getWhatsappSession, login as payloadLogin, requestWhatsappQr, createDeal, tagMessages, updateMessage, updateContact, updateDeal, updateTask } from '@/lib/payload'
import type { Contact, Deal, GmailSyncState, Message, Stage, Task, User, WhatsappSession } from '@/lib/types'
import { AnalyticsIcon, BoardIcon, LogOutIcon, PlusIcon, MailIcon, QueueIcon, RefreshIcon, SearchIcon, TaskIcon, WhatsAppIcon } from './Icons'
import { LoginScreen } from './LoginScreen'
import { QueueView } from './QueueView'
import { BoardView } from './BoardView'
import { DealDrawer } from './DealDrawer'
import { dueBucket } from './DueDate'
import { WhatsappView } from './WhatsappView'
import { EmailView, type EmailFocus } from './EmailView'
import { NewDealModal } from './NewDealModal'
import { AnalyticsView } from './AnalyticsView'
import { TaskView } from './TaskView'

const TOKEN_KEY = 'mintbox-crm-token'
const REFRESH_EVERY_MS = 6 * 60 * 60 * 1000

// localStorage (not sessionStorage) so the installed app stays signed in
// between launches; the token is refreshed on open and every few hours.
const tokenStore = {
  get(): string | null {
    try { return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY) } catch { return null }
  },
  set(value: string) {
    try { localStorage.setItem(TOKEN_KEY, value); sessionStorage.removeItem(TOKEN_KEY) } catch { /* storage blocked */ }
  },
  clear() {
    try { localStorage.removeItem(TOKEN_KEY); sessionStorage.removeItem(TOKEN_KEY) } catch { /* storage blocked */ }
  },
}

function isTaskOverdue(task: { done?: boolean | null; dueDate?: string | null }) {
  return !task.done && dueBucket(task.dueDate) === 'overdue'
}

export function CrmApp() {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [deals, setDeals] = useState<Deal[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedDealId, setSelectedDealId] = useState<string | number | null>(null)
  const [view, setView] = useState<'queue' | 'board' | 'whatsapp' | 'email' | 'analytics' | 'tasks'>('board')
  const [search, setSearch] = useState('')
  const [whatsappSession, setWhatsappSession] = useState<WhatsappSession | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [whatsappError, setWhatsappError] = useState('')
  const [whatsappLoading, setWhatsappLoading] = useState(false)
  const [emails, setEmails] = useState<Message[]>([])
  const [gmailSync, setGmailSync] = useState<GmailSyncState | null>(null)
  const [emailError, setEmailError] = useState('')
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailFocus, setEmailFocus] = useState<{ focus: EmailFocus; nonce: number } | null>(null)
  const [booting, setBooting] = useState(true)
  // Set when the saved session couldn't be checked (offline, server slow) -
  // as opposed to rejected - so we offer a retry instead of signing out.
  const [bootError, setBootError] = useState('')
  const [bootAttempt, setBootAttempt] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [showNewDeal, setShowNewDeal] = useState(false)

  const logout = useCallback(() => {
    tokenStore.clear()
    setToken(null)
    setUser(null)
    setDeals([])
    setTasks([])
    setMessages([])
    setEmails([])
    setGmailSync(null)
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

  const loadTasks = useCallback(async (activeToken: string) => {
    try {
      const rows = await getTasks(activeToken)
      setTasks(rows)
    } catch (cause) {
      if (cause instanceof ApiError && cause.status === 401) logout()
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

  const loadEmail = useCallback(async (activeToken: string) => {
    setEmailLoading(true)
    try {
      const [rows, state] = await Promise.all([getEmailMessages(activeToken), getGmailSync(activeToken)])
      setEmails(rows)
      setGmailSync(state)
      setEmailError('')
    } catch (cause) {
      if (cause instanceof ApiError && cause.status === 401) logout()
      else setEmailError(cause instanceof Error ? cause.message : 'Could not load email')
    } finally {
      setEmailLoading(false)
    }
  }, [logout])

  useEffect(() => {
    async function restoreSession() {
      let stored = tokenStore.get()
      if (!stored) {
        setBooting(false)
        return
      }
      try {
        // Renewing is a nice-to-have: never let a slow refresh block opening the app.
        const renewed = await Promise.race([
          refreshSession(stored).catch(() => null),
          new Promise<null>((resolve) => window.setTimeout(() => resolve(null), 5000)),
        ])
        stored = renewed || stored
        tokenStore.set(stored)
        const [currentUser, rows] = await Promise.all([getCurrentUser(stored), getDeals(stored)])
        setToken(stored)
        setUser(currentUser)
        setDeals(rows)
        void loadWhatsapp(stored)
        void loadEmail(stored)
        void loadTasks(stored)
      } catch (cause) {
        // Only a definite "not signed in" ends the session; a network blip or
        // a slow server must not sign someone out of the installed app.
        if (cause instanceof ApiError && (cause.status === 401 || cause.status === 403)) tokenStore.clear()
        else setBootError(navigator.onLine ? 'The CRM server is not responding.' : 'You are offline.')
      } finally {
        setBooting(false)
      }
    }

    void restoreSession()
  }, [loadWhatsapp, loadEmail, loadTasks, bootAttempt])

  // While pairing, WhatsApp swaps the QR every ~20s: keep the tab fresh so the
  // code on screen is always the live one.
  const whatsappPairing = whatsappSession?.status !== 'connected'
  useEffect(() => {
    if (!token || view !== 'whatsapp' || !whatsappPairing) return
    const timer = window.setInterval(() => { void loadWhatsapp(token) }, 5000)
    return () => window.clearInterval(timer)
  }, [token, view, whatsappPairing, loadWhatsapp])

  // Keep long-lived app sessions alive without asking to sign in again.
  useEffect(() => {
    if (!token) return
    const timer = window.setInterval(async () => {
      const next = await refreshSession(token).catch(() => null)
      if (next) { tokenStore.set(next); setToken(next) }
    }, REFRESH_EVERY_MS)
    return () => window.clearInterval(timer)
  }, [token])

  async function handleLogin(email: string, password: string) {
    const result = await payloadLogin(email, password)
    tokenStore.set(result.token)
    setToken(result.token)
    setUser(result.user)
    await Promise.all([loadDeals(result.token), loadWhatsapp(result.token), loadEmail(result.token), loadTasks(result.token)])
  }

  async function refresh() {
    if (!token) return
    setRefreshing(true)
    try { await Promise.all([loadDeals(token), loadWhatsapp(token), loadEmail(token), loadTasks(token)]) } finally { setRefreshing(false) }
  }

  // Saves run one at a time: Payload rewrites the row, so two PATCHes in flight
  // can clobber each other's fields (e.g. quantity then value-per-hamper).
  const saveQueue = useRef<Promise<unknown>>(Promise.resolve())

  async function patchDeal(deal: Deal, patch: Partial<Deal>) {
    if (!token) return
    setDeals((current) => current.map((item) => item.id === deal.id ? { ...item, ...patch } : item))
    const run = saveQueue.current.catch(() => undefined).then(() => updateDeal(token, deal.id, patch))
    saveQueue.current = run
    try {
      const updated = await run
      setDeals((current) => current.map((item) => item.id === deal.id ? updated : item))
    } catch (cause) {
      await loadDeals(token).catch(() => undefined)
      setError(cause instanceof Error ? cause.message : 'Could not save the deal')
      throw cause
    }
  }

  async function patchContact(deal: Deal, patch: Partial<Contact>) {
    if (!token || typeof deal.contact !== 'object') return
    const contactId = deal.contact.id
    const apply = (fn: (c: Contact) => Contact) => setDeals((current) => current.map((item) =>
      typeof item.contact === 'object' && item.contact.id === contactId ? { ...item, contact: fn(item.contact) } : item))
    apply((c) => ({ ...c, ...patch }))
    try {
      const updated = await updateContact(token, contactId, patch)
      apply((c) => ({ ...c, ...updated }))
    } catch (cause) {
      await loadDeals(token).catch(() => undefined)
      setError(cause instanceof Error ? cause.message : 'Could not save the contact')
      throw cause
    }
  }

  /** Open a deal from a WhatsApp/email conversation and file its messages under it. */
  async function turnIntoDeal(contact: Contact, source: 'whatsapp' | 'email') {
    if (!token) return
    try {
      const deal = await createDeal(token, {
        title: `${contact.company || contact.name} - ${source === 'whatsapp' ? 'WhatsApp' : 'Email'} enquiry`,
        contact: contact.id,
        stage: 'new',
        source,
        awaitingWhom: 'us',
      })
      const unfiled = [...messages, ...emails].filter((m) =>
        (typeof m.contact === 'object' ? m.contact.id : m.contact) === contact.id && !m.deal)
      await Promise.all(unfiled.map((m) => updateMessage(token, m.id, { deal: deal.id })))
      setDeals((current) => [deal, ...current])
      setSelectedDealId(deal.id)
      void loadWhatsapp(token)
      void loadEmail(token)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not create the deal')
    }
  }

  /**
   * Tag chat messages with a deal (or clear it). The Messages hook only
   * stamps deal activity on create, so pull the deal's last-message times
   * forward here when the newly filed messages are more recent.
   */
  async function tagMessagesToDeal(rows: Message[], dealId: string | null) {
    if (!token || rows.length === 0) return
    const ids = new Set(rows.map((m) => String(m.id)))
    try {
      await tagMessages(token, [...ids], dealId)
      setMessages((current) => current.map((m) => ids.has(String(m.id)) ? { ...m, deal: dealId } : m))
      const deal = dealId ? deals.find((d) => String(d.id) === dealId) : undefined
      if (!deal) return
      const latest = (direction?: Message['direction']) => rows
        .filter((m) => !direction || m.direction === direction)
        .reduce<string | null>((max, m) => (!max || m.sentAt > max ? m.sentAt : max), null)
      const later = (candidate: string | null, existing?: string | null) =>
        candidate && (!existing || new Date(candidate) > new Date(existing)) ? candidate : undefined
      const patch: Partial<Deal> = {
        lastMessageAt: later(latest(), deal.lastMessageAt),
        lastInboundMessageAt: later(latest('inbound'), deal.lastInboundMessageAt),
        lastOutboundMessageAt: later(latest('outbound'), deal.lastOutboundMessageAt),
      }
      const changed = Object.fromEntries(Object.entries(patch).filter(([, value]) => value))
      if (Object.keys(changed).length > 0) {
        const updated = await updateDeal(token, deal.id, changed)
        setDeals((current) => current.map((d) => d.id === updated.id ? updated : d))
      }
    } catch (cause) {
      void loadWhatsapp(token)
      setError(cause instanceof Error ? cause.message : 'Could not tag the chat')
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

  async function addTask(label: string, dueDate?: string | null) {
    if (!token) return
    try {
      const created = await createTask(token, { label, dueDate: dueDate || null })
      setTasks((current) => [created, ...current])
    } catch (cause) {
      if (cause instanceof ApiError && cause.status === 401) return logout()
      setError(cause instanceof Error ? cause.message : 'Could not add the to-do')
    }
  }

  async function toggleTask(task: Task) {
    if (!token) return
    const nextDone = !task.done
    setTasks((current) => current.map((item) => item.id === task.id
      ? { ...item, done: nextDone, doneAt: nextDone ? new Date().toISOString() : null }
      : item))
    try {
      const updated = await updateTask(token, task.id, { done: nextDone })
      setTasks((current) => current.map((item) => item.id === task.id ? updated : item))
    } catch (cause) {
      await loadTasks(token).catch(() => undefined)
      setError(cause instanceof Error ? cause.message : 'Could not update the to-do')
    }
  }

  async function rescheduleTask(task: Task, dueDate: string) {
    if (!token) return
    setTasks((current) => current.map((item) => item.id === task.id ? { ...item, dueDate } : item))
    try {
      const updated = await updateTask(token, task.id, { dueDate })
      setTasks((current) => current.map((item) => item.id === task.id ? updated : item))
    } catch (cause) {
      await loadTasks(token).catch(() => undefined)
      setError(cause instanceof Error ? cause.message : 'Could not change the date')
    }
  }

  async function removeTask(task: Task) {
    if (!token) return
    setTasks((current) => current.filter((item) => item.id !== task.id))
    try {
      await deleteTask(token, task.id)
    } catch (cause) {
      await loadTasks(token).catch(() => undefined)
      setError(cause instanceof Error ? cause.message : 'Could not delete the to-do')
    }
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
  if (bootError && !token) {
    return (
      <div className="boot-screen">
        <span className="brand-mark">M</span>
        <p>{bootError} You are still signed in.</p>
        <button type="button" className="toolbar-button primary" onClick={() => { setBootError(''); setBooting(true); setBootAttempt((n) => n + 1) }}>Retry</button>
      </div>
    )
  }
  if (!token || !user) return <LoginScreen onLogin={handleLogin} />

  const selectedDeal = selectedDealId == null ? null : deals.find((deal) => deal.id === selectedDealId) || null
  const overdueTaskCount = tasks.filter(isTaskOverdue).length + deals.reduce((n, deal) => n + (deal.tasks || []).filter(isTaskOverdue).length, 0)

  const viewMeta = {
    board: { title: 'Deals', subtitle: `${filteredDeals.length} records` },
    queue: { title: 'Priority queue', subtitle: 'Work that needs attention' },
    email: { title: 'Email', subtitle: `${emails.length} synced messages` },
    whatsapp: { title: 'WhatsApp mirror', subtitle: `${messages.length} captured messages` },
    analytics: { title: 'Analytics', subtitle: 'Pipeline and activity' },
    tasks: { title: 'To-dos', subtitle: `${tasks.filter((task) => !task.done).length + deals.reduce((n, deal) => n + (deal.tasks || []).filter((task) => !task.done).length, 0)} pending` },
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
          <button className={view === 'email' ? 'active' : ''} onClick={() => setView('email')} title="Email">
            <MailIcon /><span>Email</span>
            {gmailSync?.accounts?.some((a) => a.lastError) && <i className="nav-alert" />}
          </button>
          <button className={view === 'analytics' ? 'active' : ''} onClick={() => setView('analytics')} title="Analytics"><AnalyticsIcon /><span>Analytics</span></button>
          <button className={view === 'tasks' ? 'active' : ''} onClick={() => setView('tasks')} title="To-dos">
            <TaskIcon /><span>To-dos</span>
            {overdueTaskCount > 0 && <i className="nav-alert" />}
          </button>
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
            <button className="icon-button sign-out-button" onClick={() => { if (window.confirm('Sign out of MintBox CRM?')) logout() }} aria-label="Sign out" title="Sign out"><LogOutIcon /></button>
          </div>
        </header>

        {error && <div className="error-banner" role="alert"><span>{error}</span><button onClick={() => setError('')}>Dismiss</button></div>}
        <main className="app-main">
          {view === 'queue' && <QueueView deals={filteredDeals} onOpen={(deal) => setSelectedDealId(deal.id)} onSnooze={snooze} />}
          {view === 'board' && <BoardView deals={filteredDeals} onOpen={(deal) => setSelectedDealId(deal.id)} onMove={moveDeal} />}
          {view === 'whatsapp' && <WhatsappView session={whatsappSession} messages={messages} loading={whatsappLoading} error={whatsappError} onRefresh={() => token ? loadWhatsapp(token) : Promise.resolve()} deals={deals} onOpenDeal={(deal) => setSelectedDealId(deal.id)} onTurnIntoDeal={(contact) => turnIntoDeal(contact, 'whatsapp')} onTagMessages={tagMessagesToDeal} onRequestQr={async () => { if (!token) return; await requestWhatsappQr(token); await loadWhatsapp(token) }} />}
          {view === 'email' && <EmailView key={emailFocus?.nonce ?? 0} token={token} messages={emails} sync={gmailSync} loading={emailLoading} error={emailError} focus={emailFocus?.focus ?? null} onRefresh={() => loadEmail(token)} onSent={(message) => { void loadEmail(token); setEmails((current) => [message, ...current]) }} deals={deals} onOpenDeal={(deal) => setSelectedDealId(deal.id)} onTurnIntoDeal={(contact) => turnIntoDeal(contact, 'email')} />}
          {view === 'analytics' && <AnalyticsView deals={deals} messages={messages} whatsappSession={whatsappSession} />}
          {view === 'tasks' && <TaskView tasks={tasks} deals={deals} onAdd={addTask} onToggle={toggleTask} onDelete={removeTask} onDue={rescheduleTask} onPatchDealTasks={(deal, next) => patchDeal(deal, { tasks: next }).catch(() => undefined)} onOpenDeal={(deal) => setSelectedDealId(deal.id)} />}
        </main>
      </div>
      <DealDrawer key={selectedDeal?.id ?? 'none'} deal={selectedDeal} emails={emails} onCompose={(focus) => { setEmailFocus({ focus, nonce: Date.now() }); setSelectedDealId(null); setView('email') }} onClose={() => setSelectedDealId(null)} onPatch={(patch) => selectedDeal ? patchDeal(selectedDeal, patch) : Promise.resolve()} onPatchContact={(patch) => selectedDeal ? patchContact(selectedDeal, patch) : Promise.resolve()} />
      {showNewDeal && token && <NewDealModal token={token} onClose={() => setShowNewDeal(false)} onCreated={dealCreated} />}
    </div>
  )
}
