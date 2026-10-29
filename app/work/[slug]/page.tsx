import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Link } from '@/components/ui/Link';
import { getProjects, getProject } from '@/lib/content';
import { ProjectMedia } from '@/components/ui/ProjectMedia';
import { ChapterNav } from '@/components/scroll/ChapterNav';
import { Contact } from '@/components/ui/Contact';
import { YoGurtGallery } from '@/components/ui/YoGurtGallery';
import { AggreGallery } from '@/components/ui/AggreGallery';
import { OotdGallery } from '@/components/ui/OotdGallery';
import { ScreenCard } from '@/components/ui/ScreenCard';
import { ScreenPair } from '@/components/ui/ScreenPair';

export function generateStaticParams() { return getProjects().map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  return { title: project?.meta.title ?? 'Project not found', description: project?.meta.description };
}
export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug); if (!project) notFound();
  const { meta, content } = project;
  const projects = getProjects(), next = projects[(projects.findIndex(p => p.slug === meta.slug) + 1) % projects.length];
  return <main id="main"><article className="case-study">
    <header className="section page-intro case-header"><Link href="/work" className="text-link back-link">All work</Link><h1 style={{ viewTransitionName: `title-${meta.slug}` }}>{meta.title}</h1><p className="intro-copy">{meta.description}</p><div className="credits"><span>{meta.discipline}</span>{meta.stack.length > 0 && <span>{meta.stack.join(' · ')}</span>}<span>{meta.status}</span>{meta.live && <a href={meta.live}>Live project ↗</a>}{meta.source && <a href={meta.source}>Source code ↗</a>}</div></header>
    <div className="case-image"><ProjectMedia project={meta} priority /></div>
    <div className="section case-body"><ChapterNav /><div className="case-prose"><MDXRemote source={content} components={{ h2: ({ children }) => <h2 id={String(children).toLowerCase().replaceAll(' ', '-')}>{children}</h2>, YoGurtGallery, AggreGallery, OotdGallery, ScreenCard, ScreenPair }} /></div></div>
    <section className="next-project section"><p className="mono">Next project</p><Link href={`/work/${next.slug}`}><h2>{next.title}<span aria-hidden="true">↗</span></h2></Link></section>

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'CreativeWork', name: meta.title, description: meta.description, author: { '@type': 'Person', name: 'Bryan Imanuel' } }).replace(/</g, '\\u003c') }} />
  </article><Contact /></main>;
}

