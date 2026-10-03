import { NextRequest } from 'next/server'
import { exchangeCode, saveRefreshToken, verifyState } from '@/lib/gmailOAuth'

// Google redirects here after the consent screen. Verifies the signed state,
// checks the account that signed in is the mailbox being connected, and
// stores its refresh token.
export const dynamic = 'force-dynamic'

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function page(title: string, detail: string, ok: boolean) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui,sans-serif;background:#f6f7f9;color:#1f2430}
main{max-width:420px;margin:16px;padding:28px;border:1px solid #e3e6eb;border-radius:10px;background:#fff}
h1{margin:0 0 8px;font-size:18px;color:${ok ? '#2f8f55' : '#b23b3b'}}p{margin:0;font-size:14px;line-height:1.6;color:#565c68}</style></head>
<body><main><h1>${escapeHtml(title)}</h1><p>${escapeHtml(detail)}</p></main></body></html>`
  return new Response(html, { status: ok ? 200 : 400, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const state = verifyState(params.get('state') || '')
  if (!state) return page('Link expired', 'This connect link is invalid or older than 15 minutes. Go back to the CRM and click Connect again.', false)
  if (params.get('error')) return page('Not connected', `Google returned "${params.get('error')}". Nothing was changed.`, false)

  const code = params.get('code')
  if (!code) return page('Not connected', 'Google did not return an authorisation code.', false)

  try {
    const tokens = await exchangeCode(code, state.redirectUri)
    const profileRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/profile', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    })
    const profile = (await profileRes.json().catch(() => ({}))) as { emailAddress?: string }
    const signedIn = (profile.emailAddress || '').toLowerCase()
    if (signedIn !== state.mailbox) {
      return page('Wrong account', `You signed in as ${signedIn || 'an unknown account'}, but this link connects ${state.mailbox}. Click Connect again and choose ${state.mailbox}.`, false)
    }
    if (!tokens.refresh_token) {
      return page('Not connected', 'Google did not return a refresh token. Remove "MintBox CRM" at myaccount.google.com/permissions for this mailbox, then connect again.', false)
    }
    await saveRefreshToken(state.mailbox, tokens.refresh_token)
    return page(`${state.mailbox} connected`, 'The CRM will start syncing this mailbox on the next run. You can close this tab.', true)
  } catch (err) {
    return page('Not connected', err instanceof Error ? err.message : 'Unexpected error', false)
  }
}
