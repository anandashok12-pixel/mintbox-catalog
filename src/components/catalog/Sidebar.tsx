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
  // parent). Sidebar clicks only navigate - they don't filter the grid.
  activeCat: string | null
}

// Diwali Gifting is a display-only grouping: "Hampers & Boxes" and "Products"
// are shown nested under it in this sidebar, but there is no parent field in
// the data model. A self-referencing relationship field was tried and broke
// schema push against production Postgres (2026-09-26, column never created,
// took down the whole Payload API) - this hardcoded slug list avoids touching
// the schema again for what is purely a visual grouping.
export const DIWALI_PARENT_SLUG = 'diwali-gifting'
const DIWALI_CHILD_SLUGS = new Set(['diwali-gift-boxes', 'diwali-2026-products'])

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

  const diwaliParent = categories.find((c) => c.slug === DIWALI_PARENT_SLUG)
  const diwaliChildren = categories.filter((c) => DIWALI_CHILD_SLUGS.has(c.slug))
  const rest = categories.filter((c) => c.slug !== DIWALI_PARENT_SLUG && !DIWALI_CHILD_SLUGS.has(c.slug))

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
          {diwaliParent && diwaliChildren.length > 0 && (
            <li>
              <div className="sidebar-group-label">
                {diwaliParent.emoji} {diwaliParent.name}
              </div>
              <ul className="sidebar-sublist">
                {diwaliChildren.map((cat) => (
                  <li key={cat.id}>
                    <button
                      className={`sidebar-item sidebar-item--sub${activeCat === cat.slug ? ' active' : ''}`}
                      onClick={() => scrollTo(cat.name)}
                    >
                      <span>{cat.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          )}
          {rest.map((cat) => (
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
