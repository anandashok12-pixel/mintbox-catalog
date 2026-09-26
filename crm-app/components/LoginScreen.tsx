'use client'

import { FormEvent, useState } from 'react'

export function LoginScreen({ onLogin }: { onLogin: (email: string, password: string) => Promise<void> }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setPending(true)
    setError('')
    try {
      await onLogin(email.trim(), password)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not sign in')
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="login-shell">
      <div className="login-brand" aria-hidden="true">
        <span className="brand-mark">M</span>
        <span>MintBox</span>
      </div>
      <section className="login-panel">
        <div className="login-kicker">Private sales desk</div>
        <h1>Good work starts<br />with a clear desk.</h1>
        <p className="login-intro">Sign in with your MintBox admin account to see today’s conversations and pipeline.</p>
        <form onSubmit={submit} className="login-form">
          <label>
            <span>Email</span>
            <input autoFocus autoComplete="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required placeholder="you@themintbox.in" />
          </label>
          <label>
            <span>Password</span>
            <input autoComplete="current-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required placeholder="Your password" />
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="primary-button" disabled={pending} type="submit">
            <span>{pending ? 'Opening your desk…' : 'Open the CRM'}</span>
            <span aria-hidden="true">→</span>
          </button>
        </form>
        <p className="login-footnote">One account. One customer record. Powered by the existing MintBox data layer.</p>
      </section>
      <aside className="login-aside" aria-hidden="true">
        <div className="aside-number">01</div>
        <p>Listen closely.<br />Follow up clearly.<br />Close with care.</p>
        <div className="aside-rule" />
        <span>Internal · Bengaluru</span>
      </aside>
    </main>
  )
}
