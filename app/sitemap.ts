import { site } from '@/lib/site';
import { getProjects } from '@/lib/content';
import { getArticles } from '@/lib/writing';
export default function sitemap() { return ['/', '/work', '/about', '/lab', '/writing', '/contact', '/colophon', ...getProjects().map(p => `/work/${p.slug}`), ...getArticles().map(a => `/writing/${a.slug}`)].map(path => ({ url: `${site.url}${path}` })); }
