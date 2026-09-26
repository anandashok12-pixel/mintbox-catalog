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
      <section className="login-panel">
        <div className="login-product"><span>MB</span><div><strong>CRM</strong><small>Sales workspace</small></div></div>
        <h1>Sign in</h1>
        <p className="login-intro">Use your existing Payload admin account.</p>
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
            <span>{pending ? 'Signing in…' : 'Continue'}</span>
            <span aria-hidden="true">→</span>
          </button>
        </form>
        <p className="login-footnote">Internal sales workspace</p>
      </section>
    </main>
  )
}
