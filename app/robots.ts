import { site } from '@/lib/site';
export default function robots() { return { rules: { userAgent: '*', ...(process.env.NEXT_PUBLIC_SITE_URL ? { allow: '/' } : { disallow: '/' }) }, sitemap: `${site.url}/sitemap.xml` }; }
