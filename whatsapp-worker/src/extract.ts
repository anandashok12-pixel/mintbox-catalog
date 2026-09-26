import type { proto } from '@whiskeysockets/baileys'

export interface ExtractedContent {
  text?: string
  hasMedia: boolean
  mediaType?: 'image' | 'video' | 'audio' | 'document' | 'sticker'
  mimeType?: string
  filename?: string
}

/**
 * Pulls the readable text and media descriptor out of a WhatsApp message
 * across the handful of content types that actually show up in sales
 * conversations. Anything unrecognised (polls, reactions, protocol
 * messages) yields no text and no media - the caller skips those rather
 * than storing an empty row.
 */
export function extractMessageContent(message: proto.IMessage | null | undefined): ExtractedContent {
  if (!message) return { hasMedia: false }

  if (message.conversation) {
    return { text: message.conversation, hasMedia: false }
  }
  if (message.extendedTextMessage?.text) {
    return { text: message.extendedTextMessage.text, hasMedia: false }
  }
  if (message.imageMessage) {
    return {
      text: message.imageMessage.caption || undefined,
      hasMedia: true,
      mediaType: 'image',
      mimeType: message.imageMessage.mimetype || 'image/jpeg',
      filename: 'whatsapp-image.jpg',
    }
  }
  if (message.videoMessage) {
    return {
      text: message.videoMessage.caption || undefined,
      hasMedia: true,
      mediaType: 'video',
      mimeType: message.videoMessage.mimetype || 'video/mp4',
      filename: 'whatsapp-video.mp4',
    }
  }
  if (message.documentMessage) {
    return {
      text: message.documentMessage.caption || undefined,
      hasMedia: true,
      mediaType: 'document',
      mimeType: message.documentMessage.mimetype || 'application/octet-stream',
      filename: message.documentMessage.fileName || 'whatsapp-document',
    }
  }
  if (message.audioMessage) {
    return {
      hasMedia: true,
      mediaType: 'audio',
      mimeType: message.audioMessage.mimetype || 'audio/ogg',
      filename: message.audioMessage.ptt ? 'whatsapp-voice-note.ogg' : 'whatsapp-audio.ogg',
    }
  }
  if (message.stickerMessage) {
    return {
      hasMedia: true,
      mediaType: 'sticker',
      mimeType: message.stickerMessage.mimetype || 'image/webp',
      filename: 'whatsapp-sticker.webp',
    }
  }

  return { hasMedia: false }
}
