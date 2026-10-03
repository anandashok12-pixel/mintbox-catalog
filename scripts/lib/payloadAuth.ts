/**
 * Authenticated REST writes for the scripts in scripts/.
 *
 * Products, Categories, Media and the page globals only accept writes from a
 * logged-in user, so scripts that POST/PATCH to {BASE_URL}/api/... log in as
 * a Payload admin first and send the returned JWT on every write.
 *
 * Credentials come from the environment, never from the repo:
 *   PAYLOAD_ADMIN_EMAIL     email of an existing user in the `users` collection
 *   PAYLOAD_ADMIN_PASSWORD  that user's password
 *
 * Login is lazy: nothing happens until the first call to authHeaders(), so a
 * script's dry run (which only reads) needs no credentials at all.
 */

const tokens = new Map<string, Promise<string>>()

async function login(baseUrl: string): Promise<string> {
  const email = process.env.PAYLOAD_ADMIN_EMAIL?.trim()
  const password = process.env.PAYLOAD_ADMIN_PASSWORD
  if (!email || !password) {
    throw new Error(
      'Writing to Payload needs an admin login: set PAYLOAD_ADMIN_EMAIL and PAYLOAD_ADMIN_PASSWORD in the environment.',
    )
  }

  const res = await fetch(`${baseUrl}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = (await res.json().catch(() => null)) as { token?: string; errors?: { message?: string }[] } | null
  if (!res.ok || !data?.token) {
    const reason = data?.errors?.[0]?.message ?? `HTTP ${res.status}`
    throw new Error(`Payload login as ${email} at ${baseUrl} failed: ${reason}`)
  }
  return data.token
}

/** Returns the Authorization header for write requests, logging in once per base URL. */
export async function authHeaders(baseUrl: string): Promise<{ Authorization: string }> {
  const key = baseUrl.replace(/\/$/, '')
  let token = tokens.get(key)
  if (!token) {
    token = login(key)
    tokens.set(key, token)
    // Let a failed login be retried instead of caching the rejection.
    token.catch(() => tokens.delete(key))
  }
  return { Authorization: `JWT ${await token}` }
}
