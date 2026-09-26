import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

const payloadURL = (
  process.env.PAYLOAD_URL ||
  process.env.NEXT_PUBLIC_PAYLOAD_URL ||
  'http://localhost:3000'
).replace(/\/$/, '')

async function relay(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params
  const upstreamURL = new URL(`/api/${path.map(encodeURIComponent).join('/')}`, payloadURL)
  upstreamURL.search = request.nextUrl.search

  const headers = new Headers()
  const authorization = request.headers.get('authorization')
  const contentType = request.headers.get('content-type')
  if (authorization) headers.set('authorization', authorization)
  if (contentType) headers.set('content-type', contentType)
  headers.set('accept', 'application/json')

  const hasBody = request.method !== 'GET' && request.method !== 'HEAD'
  const response = await fetch(upstreamURL, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : undefined,
    cache: 'no-store',
  })

  return new Response(response.body, {
    status: response.status,
    headers: {
      'content-type': response.headers.get('content-type') || 'application/json',
      'cache-control': 'no-store',
    },
  })
}

export const GET = relay
export const POST = relay
export const PATCH = relay
