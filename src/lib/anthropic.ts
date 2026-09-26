import Anthropic from '@anthropic-ai/sdk'

// Lazy, mirroring src/lib/resend's pattern in api/leads/route.ts: constructing
// eagerly at module scope breaks `next build`'s page-data collection where
// env vars aren't populated.
let client: Anthropic | null = null

export function getAnthropic(): Anthropic {
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY?.trim() || 'sk-ant-placeholder' })
  }
  return client
}

export const EXTRACTION_MODEL = 'claude-opus-5'
