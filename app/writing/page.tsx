import type { Metadata } from 'next';
import { Contact } from '@/components/ui/Contact';
import { getArticles } from '@/lib/writing';
import { Link } from '@/components/ui/Link';
export const metadata: Metadata = { title: 'Writing', description: 'Notes on building interfaces. Articles coming soon.' };
export default function Writing() {
  const articles = getArticles();
  return <main id="main"><section className="section page-intro writing-page"><h1>Thinking<br /><span className="light">out loud.</span></h1>{articles.length ? <div className="article-list">{articles.map(article => <article key={article.slug}><time dateTime={article.meta.date}>{article.meta.date}</time><h2><Link href={`/writing/${article.slug}`}>{article.meta.title}</Link></h2><p>{article.meta.description}</p></article>)}</div> : <div className="empty-writing"><p>Nothing published just yet.</p><p className="muted">This space is for notes on interfaces, engineering decisions, and the details in between.</p></div>}</section><Contact /></main>;
}
