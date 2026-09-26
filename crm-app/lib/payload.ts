import type { Deal, PaginatedResponse, User } from './types'

const payloadUrl = (process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000').replace(/\/$/, '')

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message)
  }
}

async function request<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  const response = await fetch(`${payloadUrl}${path}`, {
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

export async function getDeals(token: string): Promise<Deal[]> {
  const result = await request<PaginatedResponse<Deal>>(
    '/api/deals?limit=500&depth=1&sort=-updatedAt',
    { cache: 'no-store' },
    token,
  )
  return result.docs
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

export function payloadAdminDealUrl(id: string | number): string {
  return `${payloadUrl}/admin/collections/deals/${id}`
}
