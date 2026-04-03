import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'
import type { SanitizedConfig } from 'payload'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const configPromise = import('@payload-config').then((m) => m.default) as Promise<SanitizedConfig>

export const generateMetadata = ({ params, searchParams }: Args) =>
  generatePageMetadata({ config: configPromise, params, searchParams })

const NotFound = ({ params, searchParams }: Args) =>
  NotFoundPage({ config: configPromise, params, searchParams, importMap })

export default NotFound
