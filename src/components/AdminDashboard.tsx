'use client'

import React from 'react'
import Link from 'next/link'

const COLLECTIONS = [
  { label: 'Categories', slug: 'categories', emoji: '🗂️', desc: 'Manage product categories' },
  { label: 'Products', slug: 'products', emoji: '🛍️', desc: 'Add & edit catalog products' },
  { label: 'Leads', slug: 'leads', emoji: '📋', desc: 'View pricing enquiries' },
  { label: 'Media', slug: 'media', emoji: '🖼️', desc: 'Upload & manage images' },
  { label: 'Users', slug: 'users', emoji: '👤', desc: 'Admin user accounts' },
]

export function AdminDashboard() {
  return (
    <div style={{ padding: '2rem', maxWidth: '900px' }}>
      <h1 style={{ marginBottom: '0.5rem', fontSize: '1.75rem', fontWeight: 700 }}>
        MintBox Catalog
      </h1>
      <p style={{ marginBottom: '2rem', opacity: 0.6, fontSize: '0.95rem' }}>
        Admin dashboard — select a collection to get started.
      </p>
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
