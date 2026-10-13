'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'
import { cardImageUrl } from '@/lib/cardImage'

interface ProductCardImageProps {
  /** Original image URL from Payload. */
  src: string
  alt: string
  eager?: boolean
}

/**
 * Catalogue card image. Loads the pre-generated 600px WebP thumbnail
 * (card/<filename>.webp in Blob, ~30 KB) instead of the ~300 KB original,
 * and falls back to the original if a thumbnail is missing (e.g. its
 * generation failed at upload time).
 */
export default function ProductCardImage({ src, alt, eager = false }: ProductCardImageProps) {
  const thumb = cardImageUrl(src)
  const [failed, setFailed] = useState(false)

  // An eager image can fail before hydration, in which case React never
  // sees the error event: check the settled state when the node attaches.
  const checkSettled = useCallback((img: HTMLImageElement | null) => {
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [])

  return (
    <Image
      ref={checkSettled}
      src={thumb && !failed ? thumb : src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
      loading={eager ? 'eager' : 'lazy'}
      // Thumbnails are already card-sized WebP, so skip the Vercel optimizer
      // (its quota ran out in Aug 2026 and 630 cards would exhaust it again).
      unoptimized
      onError={() => setFailed(true)}
      style={{ objectFit: 'cover' }}
    />
  )
}
