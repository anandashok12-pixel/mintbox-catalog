import React from 'react'

const icons: Record<string, React.ReactNode> = {
  ordering: (
    <svg viewBox="0 0 18 18" fill="none">
      <rect x="3" y="4" width="12" height="11" rx="2" stroke="#B8972E" strokeWidth="1" />
      <path d="M6 4V3C6 2.4 6.4 2 7 2H11C11.6 2 12 2.4 12 3V4" stroke="#B8972E" strokeWidth="1" strokeLinecap="round" />
      <path d="M6 9H12M6 12H10" stroke="#B8972E" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
  branding: (
    <svg viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="6.5" stroke="#B8972E" strokeWidth="1" />
      <path d="M6 9L8 11L12 7" stroke="#B8972E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  delivery: (
    <svg viewBox="0 0 18 18" fill="none">
      <path d="M3 13V7L9 4L15 7V13L9 16L3 13Z" stroke="#B8972E" strokeWidth="1" fill="none" />
      <path d="M9 4V16M3 7L15 7" stroke="#B8972E" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  ),
  products: (
    <svg viewBox="0 0 18 18" fill="none">
      <path d="M9 2L11.5 7L17 7.5L13 11.5L14 17L9 14.5L4 17L5 11.5L1 7.5L6.5 7L9 2Z" stroke="#B8972E" strokeWidth="1" fill="none" />
    </svg>
  ),
  pricing: (
    <svg viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="6.5" stroke="#B8972E" strokeWidth="1" />
      <path d="M9 5.5V6.5M9 11.5V12.5M6.5 9C6.5 9 6.5 10.5 9 10.5C11.5 10.5 11.5 9 9 9C6.5 9 6.5 7.5 9 7.5C11.5 7.5 11.5 9 9 9Z" stroke="#B8972E" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
  sustainability: (
    <svg viewBox="0 0 18 18" fill="none">
      <path d="M9 2C9 2 4 5 4 9.5C4 12 6.2 14 9 14C11.8 14 14 12 14 9.5C14 5 9 2 9 2Z" stroke="#B8972E" strokeWidth="1" fill="none" />
      <path d="M9 14V16M7 16H11" stroke="#B8972E" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
}

export function getFaqIcon(iconId: string): React.ReactNode {
  return icons[iconId] || icons.ordering
}
