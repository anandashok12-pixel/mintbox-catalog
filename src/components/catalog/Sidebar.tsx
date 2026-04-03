'use client'

interface Category {
  id: string
  name: string
  emoji?: string | null
  slug: string
}

interface SidebarProps {
  categories: Category[]
  selectedCat: string | null
  onSelectCat: (slug: string | null) => void
}

export default function Sidebar({ categories, selectedCat, onSelectCat }: SidebarProps) {
  const handleClick = (slug: string | null, catName?: string) => {
    onSelectCat(slug)
    if (catName) {
      const el = document.getElementById(`cat-${catName}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <p className="sidebar-label">Categories</p>
        <ul className="sidebar-list">
          <li>
            <button
              className={`sidebar-item${!selectedCat ? ' active' : ''}`}
              onClick={() => handleClick(null)}
            >
              <span className="sidebar-emoji">✨</span>
              <span>All Products</span>
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                className={`sidebar-item${selectedCat === cat.slug ? ' active' : ''}`}
                onClick={() => handleClick(cat.slug, cat.name)}
              >
                {cat.emoji && <span className="sidebar-emoji">{cat.emoji}</span>}
                <span>{cat.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
