import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function IconBase({ children, ...props }: IconProps) {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>
}

export const QueueIcon = (props: IconProps) => <IconBase {...props}><path d="M4 5h16M4 12h10M4 19h7"/><circle cx="18" cy="12" r="2"/><circle cx="15" cy="19" r="2"/></IconBase>
export const BoardIcon = (props: IconProps) => <IconBase {...props}><rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="11" rx="1"/><rect x="17" y="4" width="4" height="7" rx="1"/></IconBase>
export const RefreshIcon = (props: IconProps) => <IconBase {...props}><path d="M20 6v5h-5"/><path d="M18.5 15a7 7 0 1 1-.8-7.8L20 11"/></IconBase>
export const LogOutIcon = (props: IconProps) => <IconBase {...props}><path d="M10 17l5-5-5-5M15 12H3"/><path d="M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5"/></IconBase>
export const ArrowIcon = (props: IconProps) => <IconBase {...props}><path d="M5 12h14M14 7l5 5-5 5"/></IconBase>
export const CloseIcon = (props: IconProps) => <IconBase {...props}><path d="M6 6l12 12M18 6L6 18"/></IconBase>
export const WhatsAppIcon = (props: IconProps) => <IconBase {...props}><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.7A8.5 8.5 0 1 1 20.5 11.5Z"/><path d="M8.2 7.8c.3-.6.6-.6.9-.6h.4c.2 0 .4.1.5.4l.8 1.8c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4-.1.6.5 1 1.3 1.8 2.3 2.3.2.1.4.1.6-.1l.8-1c.2-.2.4-.3.7-.2l1.8.8c.3.1.4.3.4.5 0 .3-.1 1.3-.8 1.8-.6.5-1.4.8-2.3.5-1-.3-2.3-.8-3.9-2.2-1.3-1.2-2.2-2.6-2.5-3.6-.3-1 0-1.8.4-2.2Z"/></IconBase>
export const ExternalIcon = (props: IconProps) => <IconBase {...props}><path d="M14 5h5v5M19 5l-9 9"/><path d="M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4"/></IconBase>
export const SearchIcon = (props: IconProps) => <IconBase {...props}><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></IconBase>
export const MenuIcon = (props: IconProps) => <IconBase {...props}><path d="M5 7h14M5 12h14M5 17h14"/></IconBase>
export const CheckIcon = (props: IconProps) => <IconBase {...props}><path d="m5 12 4 4L19 6"/></IconBase>
export const AlertIcon = (props: IconProps) => <IconBase {...props}><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></IconBase>
