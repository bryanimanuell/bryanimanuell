import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getArticle, getArticles } from '@/lib/writing';
import { Contact } from '@/components/ui/Contact';
import { Link } from '@/components/ui/Link';
export function generateStaticParams() { return getArticles().map(a => ({ slug: a.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  return { title: article?.meta.title || 'Article not found', description: article?.meta.description };
}
export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug); if (!article) notFound();
  return <main id="main"><article className="section page-intro article-page"><div className="reading-progress" aria-hidden="true" /><Link href="/writing" className="text-link back-link">All writing</Link><h1>{article.meta.title}</h1><p className="intro-copy">{article.meta.description}</p><time dateTime={article.meta.date} className="mono muted">{article.meta.date}</time><div className="case-prose article-prose"><MDXRemote source={article.content} /></div></article><Contact /></main>;
}
