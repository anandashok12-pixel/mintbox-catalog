import type { Contact, Deal, GmailSyncState, Message, PaginatedResponse, Task, User, WhatsappSession } from './types'

const apiBase = '/payload-api'
const payloadAdminBase = (process.env.NEXT_PUBLIC_PAYLOAD_URL || 'https://themintbox.in').replace(/\/$/, '')

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message)
  }
}

async function request<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  const response = await fetch(`${apiBase}${path.replace(/^\/api/, '')}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
    credentials: 'omit',
  })

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    const message = data?.errors?.[0]?.message || data?.message || data?.error || 'Request failed'
    throw new ApiError(message, response.status)
  }
  return data as T
}

export async function login(email: string, password: string): Promise<{ token: string; user: User }> {
  return request('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function getCurrentUser(token: string): Promise<User> {
  const result = await request<{ user: User | null }>('/api/users/me', {}, token)
  if (!result.user) throw new ApiError('Session expired', 401)
  return result.user
}

/** Swap a still-valid token for a fresh one so the installed app stays signed in. */
export async function refreshSession(token: string): Promise<string | null> {
  const result = await request<{ refreshedToken?: string }>('/api/users/refresh-token', { method: 'POST' }, token)
  return result.refreshedToken || null
}

export async function getDeals(token: string): Promise<Deal[]> {
  const result = await request<PaginatedResponse<Deal>>(
    '/api/deals?limit=500&depth=1&sort=-updatedAt',
    { cache: 'no-store' },
    token,
  )
  return result.docs
}

export async function getWhatsappSession(token: string): Promise<WhatsappSession> {
  return request('/api/globals/whatsapp-session?depth=1', { cache: 'no-store' }, token)
}

export async function getWhatsappMessages(token: string): Promise<Message[]> {
  const result = await request<PaginatedResponse<Message>>(
    '/api/messages?where[channel][equals]=whatsapp&limit=500&depth=1&sort=-sentAt',
    { cache: 'no-store' },
    token,
  )
  return result.docs
}

export async function getEmailMessages(token: string): Promise<Message[]> {
  const result = await request<PaginatedResponse<Message>>(
    '/api/messages?where[channel][equals]=email&limit=500&depth=1&sort=-sentAt',
    { cache: 'no-store' },
    token,
  )
  return result.docs
}

export async function getGmailSync(token: string): Promise<GmailSyncState> {
  return request('/api/globals/gmail-sync?depth=0', { cache: 'no-store' }, token)
}

export interface SendEmailInput {
  mailbox: string
  to: string
  cc?: string
  subject: string
  body: string
  contactId?: string | number
  dealId?: string | number
  replyToMessageId?: string | number
  signature?: boolean
}

export interface DraftEmailInput {
  mailbox: string
  to: string
  subject?: string
  instructions: string
  currentDraft?: string
  contactId?: string | number
  dealId?: string | number
}

export async function draftEmail(token: string, data: DraftEmailInput): Promise<{ subject: string; body: string }> {
  return request('/api/email/draft', { method: 'POST', body: JSON.stringify(data) }, token)
}

export interface EmailSignature { mailbox: string; signature?: string | null }

export async function getEmailSignatures(token: string): Promise<EmailSignature[]> {
  const result = await request<{ signatures?: EmailSignature[] | null }>('/api/globals/email-settings?depth=0', { cache: 'no-store' }, token)
  return (result.signatures || []).map(({ mailbox, signature }) => ({ mailbox, signature }))
}

export async function saveEmailSignatures(token: string, signatures: EmailSignature[]): Promise<void> {
  await request('/api/globals/email-settings', { method: 'POST', body: JSON.stringify({ signatures }) }, token)
}

export async function sendEmail(token: string, data: SendEmailInput): Promise<Message> {
  const result = await request<{ message: Message }>('/api/email/send', {
    method: 'POST',
    body: JSON.stringify(data),
  }, token)
  return result.message
}

export async function startGmailConnect(token: string, mailbox: string): Promise<string> {
  const result = await request<{ url: string }>('/api/email/oauth/start', {
    method: 'POST',
    body: JSON.stringify({ mailbox }),
  }, token)
  return result.url
}

export function payloadFileUrl(url?: string | null): string | null {
  if (!url) return null
  if (/^https?:\/\//.test(url)) return url
  return `${payloadAdminBase}${url.startsWith('/') ? '' : '/'}${url}`
}

export async function updateDeal(
  token: string,
  id: string | number,
  data: Partial<Deal>,
): Promise<Deal> {
  const result = await request<{ doc: Deal } | Deal>(`/api/deals/${id}?depth=1`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }, token)
  return 'doc' in result ? result.doc : result
}

export async function getTasks(token: string): Promise<Task[]> {
  const result = await request<PaginatedResponse<Task>>(
    '/api/tasks?limit=500&sort=-createdAt',
    { cache: 'no-store' },
    token,
  )
  return result.docs
}

export async function createTask(
  token: string,
  data: { label: string; dueDate?: string | null },
): Promise<Task> {
  const result = await request<{ doc: Task } | Task>('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(data),
  }, token)
  return 'doc' in result ? result.doc : result
}

export async function updateTask(
  token: string,
  id: string | number,
  data: Partial<Task>,
): Promise<Task> {
  const result = await request<{ doc: Task } | Task>(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }, token)
  return 'doc' in result ? result.doc : result
}

export async function deleteTask(token: string, id: string | number): Promise<void> {
  await request(`/api/tasks/${id}`, { method: 'DELETE' }, token)
}

export function payloadAdminDealUrl(id: string | number): string {
  return `${payloadAdminBase}/admin/collections/deals/${id}`
}

export async function findContactByPhone(token: string, phoneE164: string): Promise<Contact | null> {
  const result = await request<PaginatedResponse<Contact>>(
    `/api/contacts?where[phoneE164][equals]=${encodeURIComponent(phoneE164)}&limit=1`,
    { cache: 'no-store' },
    token,
  )
  return result.docs[0] || null
}

export async function createContact(
  token: string,
  data: { name: string; phoneE164: string; company?: string; email?: string },
): Promise<Contact> {
  const result = await request<{ doc: Contact } | Contact>('/api/contacts', {
    method: 'POST',
    body: JSON.stringify(data),
  }, token)
  return 'doc' in result ? result.doc : result
}

export async function updateContact(
  token: string,
  id: string | number,
  data: Partial<Contact>,
): Promise<Contact> {
  const result = await request<{ doc: Contact } | Contact>(`/api/contacts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }, token)
  return 'doc' in result ? result.doc : result
}

export async function createDeal(
  token: string,
  data: Partial<Deal> & { title: string; contact: string | number },
): Promise<Deal> {
  const result = await request<{ doc: Deal } | Deal>('/api/deals?depth=1', {
    method: 'POST',
    body: JSON.stringify(data),
  }, token)
  return 'doc' in result ? result.doc : result
}
