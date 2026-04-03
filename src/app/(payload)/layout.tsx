import { RootLayout } from '@payloadcms/next/layouts'
import type { ImportMap, SanitizedConfig } from 'payload'
import React from 'react'
import { importMap } from './admin/importMap'
import { payloadServerAction } from './actions'
import '@payloadcms/next/css'

type Args = {
  children: React.ReactNode
}

const configPromise = import('@payload-config').then((m) => m.default) as Promise<SanitizedConfig>

export default async function Layout({ children }: Args) {
  return RootLayout({
    config: configPromise,
    children,
    importMap: importMap as ImportMap,
    serverFunction: payloadServerAction,
  })
}
