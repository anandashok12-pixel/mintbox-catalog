'use server'

import { handleServerFunctions } from '@payloadcms/next/layouts'
import type { ImportMap, ServerFunctionClientArgs, SanitizedConfig } from 'payload'
import { importMap } from './admin/importMap'

const configPromise = import('@payload-config').then((m) => m.default) as Promise<SanitizedConfig>

export async function payloadServerAction(args: ServerFunctionClientArgs) {
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap: importMap as ImportMap,
  })
}
