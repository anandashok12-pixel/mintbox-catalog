'use client'

import { scrollToCategory } from './catalogScroll'

interface Category {
  id: string
  name: string
  emoji?: string | null
  slug: string
}

interface SidebarProps {
  categories: Category[]
  // Slug of the category currently in view (driven by scroll-spy in the
  // parent; null while a search is active). Sidebar clicks only navigate -
  // they don't filter the grid.
  activeCat: string | null
  /** Category names that currently have a rendered section (filters can hide some). */
  visibleCatNames?: Set<string>
}

export default function Sidebar({ categories, activeCat, visibleCatNames }: SidebarProps) {
  return (
    <aside className="sidebar">
      <nav className="sidebar-inner" aria-label="Categories">
        <p className="sidebar-label">Categories</p>
        <ul className="sidebar-list">
          <li>
            <button
              type="button"
              className={`sidebar-item${!activeCat ? ' active' : ''}`}
              aria-current={!activeCat ? 'true' : undefined}
              onClick={() => scrollToCategory()}
            >
              <span>All Products</span>
            </button>
          </li>
          {categories.map((cat) => {
            const hidden = visibleCatNames ? !visibleCatNames.has(cat.name) : false
            return (
              <li key={cat.id}>
                <button
                  type="button"
                  className={`sidebar-item${activeCat === cat.slug ? ' active' : ''}`}
                  aria-current={activeCat === cat.slug ? 'true' : undefined}
                  disabled={hidden}
                  title={hidden ? 'No products match the current filters' : undefined}
                  onClick={() => scrollToCategory(cat.name)}
                >
                  <span>{cat.name}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
