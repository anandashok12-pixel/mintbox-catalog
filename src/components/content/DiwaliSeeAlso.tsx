import Link from 'next/link'

// Cross-links between the three Diwali pages. Each target has its own anchor
// text so the pages do not compete for the same query:
// hub = buying, corporate guide = planning and timeline, employees guide = ideas by budget.
const PAGES = [
  { key: 'hub', href: '/diwali-corporate-gifts', label: 'Shop Diwali corporate hampers and gift boxes' },
  { key: 'corporate', href: '/guides/diwali-corporate-gifts', label: 'Plan your Diwali order timeline and deadlines' },
  { key: 'employees', href: '/guides/diwali-gifts-for-employees', label: 'Diwali gift ideas for employees, by budget' },
] as const

export default function DiwaliSeeAlso({ current }: { current: (typeof PAGES)[number]['key'] }) {
  return (
    <nav className="cp-see-also" aria-label="Related Diwali pages">
      <span className="cp-see-also-label">See also</span>
      <ul>
        {PAGES.filter((p) => p.key !== current).map((p) => (
          <li key={p.key}>
            <Link href={p.href}>{p.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
