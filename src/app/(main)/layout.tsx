import type { Metadata } from 'next'
import '../globals.css'
import './landing.css'
import { libreBaskerville } from './fonts'

export const metadata: Metadata = {
  title: 'MintBox  -  Premium Corporate Gifting',
  description:
    'Curated corporate gifting packs for every occasion. Discover premium gifts, build your pack, and request custom pricing.',
  openGraph: {
    title: 'MintBox  -  Premium Corporate Gifting',
    description: 'Curated corporate gifting catalog with premium products.',
    siteName: 'MintBox',
  },
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={libreBaskerville.variable}>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9EH5D2P9LL"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9EH5D2P9LL');
            `,
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "wvlbsmgr45");
            `,
          }}
        />
        {/* Satoshi (body)  -  not on Google Fonts, served by Fontshare.
            preconnect lets the browser open the TLS/DNS in parallel with the HTML parse. */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
