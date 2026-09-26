'use client'

/* Admin Dashboard - updated 2026-04-11 */
import React from 'react'
import Link from 'next/link'

const COLLECTIONS = [
  { label: 'Categories', slug: 'categories', emoji: '🗂️', desc: 'Manage product categories' },
  { label: 'Products', slug: 'products', emoji: '🛍️', desc: 'Add & edit catalog products' },
  { label: 'Leads', slug: 'leads', emoji: '📋', desc: 'View pricing enquiries' },
  { label: 'Contacts', slug: 'contacts', emoji: '👥', desc: 'Everyone across every channel' },
  { label: 'Deals', slug: 'deals', emoji: '💼', desc: 'Enquiries and opportunities' },
  { label: 'Messages', slug: 'messages', emoji: '💬', desc: 'WhatsApp, email and form history' },
  { label: 'Media', slug: 'media', emoji: '🖼️', desc: 'Upload & manage images' },
  { label: 'Users', slug: 'users', emoji: '👤', desc: 'Admin user accounts' },
]

const GLOBALS = [
  { label: 'About Page', slug: 'about-page', emoji: '📄', desc: 'Edit about page content' },
  { label: 'Contact Page', slug: 'contact-page', emoji: '✉️', desc: 'Edit contact page content' },
  { label: 'FAQ Page', slug: 'faq-page', emoji: '❓', desc: 'Edit FAQ questions & answers' },
  { label: 'WhatsApp Mirror', slug: 'whatsapp-session', emoji: '📶', desc: 'Pairing status and health' },
]

export function AdminDashboard() {
  const crmAppUrl = process.env.NEXT_PUBLIC_CRM_APP_URL || 'http://localhost:3001'

  return (
    <div style={{ padding: '2rem', maxWidth: '900px' }}>
      <h1 style={{ marginBottom: '0.5rem', fontSize: '1.75rem', fontWeight: 700 }}>
        MintBox Catalog
      </h1>
      <p style={{ marginBottom: '2rem', opacity: 0.6, fontSize: '0.95rem' }}>
        Admin dashboard - manage collections and edit page content.
      </p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem' }}>
        <a
          href={crmAppUrl}
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1.25rem 1.5rem',
            borderRadius: '0.5rem',
            border: '2px solid rgba(13,61,43,0.35)',
            background: 'rgba(13,61,43,0.06)',
            textDecoration: 'none',
            color: 'inherit',
            gap: '0.3rem',
            width: 320,
          }}
        >
          <span style={{ fontSize: '1.75rem' }}>↗</span>
          <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>Open MintBox CRM</span>
          <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>Priority queue and pipeline in the standalone app</span>
        </a>
      </div>

      <h2 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.4, marginBottom: '0.75rem' }}>
        Page Content
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '2.5rem',
        }}
      >
        {GLOBALS.map(({ label, slug, emoji, desc }) => (
          <Link
            key={slug}
            href={`/admin/globals/${slug}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '1.25rem 1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(184,151,46,0.2)',
              background: 'rgba(184,151,46,0.05)',
              textDecoration: 'none',
              color: 'inherit',
              gap: '0.4rem',
            }}
          >
            <span style={{ fontSize: '1.75rem' }}>{emoji}</span>
            <span style={{ fontWeight: 600, fontSize: '1rem' }}>{label}</span>
            <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>{desc}</span>
          </Link>
        ))}
      </div>

      <h2 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.4, marginBottom: '0.75rem' }}>
        Collections
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem',
        }}
      >
        {COLLECTIONS.map(({ label, slug, emoji, desc }) => (
          <Link
            key={slug}
            href={`/admin/collections/${slug}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '1.25rem 1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              textDecoration: 'none',
              color: 'inherit',
              gap: '0.4rem',
            }}
          >
            <span style={{ fontSize: '1.75rem' }}>{emoji}</span>
            <span style={{ fontWeight: 600, fontSize: '1rem' }}>{label}</span>
            <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>{desc}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
