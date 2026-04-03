import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'
import type { SanitizedConfig } from 'payload'

// Always render fresh — prevents stale RSC payloads that cause React #418
// hydration mismatches on the dashboard.
export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const configPromise = import('@payload-config').then((m) => m.default) as Promise<SanitizedConfig>

export const generateMetadata = ({ params, searchParams }: Args) =>
  generatePageMetadata({ config: configPromise, params, searchParams })

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config: configPromise, params, searchParams, importMap })

export default Page
