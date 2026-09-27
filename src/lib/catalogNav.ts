// Shared by CatalogClient (mobile chip strip) and Sidebar (desktop nav) so
// the "scroll to category" offset can't drift out of sync between the two.
export const NAVBAR_OFFSET = 96

export function scrollToCatalogSection(catName?: string) {
  if (!catName) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.getElementById(`cat-${catName}`)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET
  window.scrollTo({ top, behavior: 'smooth' })
}
