'use client'

interface Category {
  id: string
  name: string
  emoji?: string | null
  slug: string
}

interface SidebarProps {
  categories: Category[]
  // Slug of the category currently in view (driven by scroll-spy in the
  // parent). Sidebar clicks only navigate — they don't filter the grid.
  activeCat: string | null
}

export default function Sidebar({ categories, activeCat }: SidebarProps) {
  // Sticky navbar is 96px; offset the scroll so the section header lands
  // just below the navbar instead of being hidden behind it.
  const NAVBAR_OFFSET = 96

  const scrollTo = (catName?: string) => {
    if (!catName) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(`cat-${catName}`)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <p className="sidebar-label">Categories</p>
        <ul className="sidebar-list">
          <li>
            <button
              className={`sidebar-item${!activeCat ? ' active' : ''}`}
              onClick={() => scrollTo()}
            >
              <span>All Products</span>
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                className={`sidebar-item${activeCat === cat.slug ? ' active' : ''}`}
                onClick={() => scrollTo(cat.name)}
              >
                <span>{cat.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
