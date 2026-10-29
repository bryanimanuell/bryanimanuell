import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ViewTransitions } from 'next-view-transitions';
import { Nav } from '@/components/ui/Nav';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { site } from '@/lib/site';
import '@/styles/tokens.css';
import '@/styles/globals.css';
const display = localFont({ src: '../public/fonts/clash-display.woff2', variable: '--font-display', display: 'swap', weight: '200 700' });
const text = localFont({ src: '../public/fonts/satoshi.woff2', variable: '--font-text', display: 'swap', weight: '300 900', preload: false });
const mono = localFont({ src: '../public/fonts/geist-mono.woff2', variable: '--font-mono', display: 'swap', weight: '100 900', preload: false });
export const metadata: Metadata = {
  metadataBase: new URL(site.url), title: { default: 'Bryan Imanuel | Software Engineer', template: '%s | Bryan Imanuel' },
  description: 'Software Engineer with 1+ year of experience building high-performance enterprise applications. Selected work, experiments, and notes by Bryan Imanuel.',
  openGraph: { type: 'website', siteName: 'Bryan Imanuel', locale: 'en_US' },
  robots: process.env.NEXT_PUBLIC_SITE_URL ? { index: true, follow: true } : { index: false, follow: false },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${text.variable} ${mono.variable}`}><body><ViewTransitions>
    <a className="skip-link" href="#main">Skip to content</a><Nav /><SmoothScroll />{children}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: site.name, jobTitle: 'Software Engineer', ...(process.env.NEXT_PUBLIC_SITE_URL ? { url: site.url } : {}) }).replace(/</g, '\\u003c') }} />
  </ViewTransitions></body></html>;
}
