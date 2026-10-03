import FestiveRoute, { festiveMetadata } from '@/components/festive/FestiveRoute'
import { CLIENTS } from '@/components/festive/pages/clients'
import '../../content-pages.css'
import '../../festive-pages.css'

// Rendered per request so catalogue prices and stock are always current.
export const dynamic = 'force-dynamic'

export function generateMetadata() {
  return festiveMetadata(CLIENTS)
}

export default function Page() {
  return <FestiveRoute config={CLIENTS} />
}
