'use client';
import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Link } from './Link';
import type { Project } from '@/lib/content';
import { ProjectMedia } from './ProjectMedia';
const HoverPreview = dynamic(() => import('./HoverPreview'), { ssr: false });
export function WorkIndex({ projects }: { projects: Project[] }) {
  const params = useSearchParams(), router = useRouter();
  const [view, setView] = useState<'index' | 'gallery'>('index');
  const [preview, setPreview] = useState<Project | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const filter = params.get('discipline') || 'All';
  function setFilter(value: string) {
    const search = new URLSearchParams(params.toString());
    if (value === 'All') search.delete('discipline'); else search.set('discipline', value);
    router.replace(`?${search}`, { scroll: false });
  }
  function changeView(next: 'index' | 'gallery') {
    if (view === next) return;
    if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.startViewTransition(() => flushSync(() => setView(next)));
    } else setView(next);
  }
  return <div ref={root} className="work-browser" onPointerLeave={() => setPreview(null)}>
    <div className="work-controls"><div className="filters" aria-label="Filter by discipline">{['All', 'Product', 'Frontend', 'Full-stack'].map(item => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="view-toggle" aria-label="Work layout"><button aria-pressed={view === 'index'} onClick={() => changeView('index')}>Index</button><button aria-pressed={view === 'gallery'} onClick={() => changeView('gallery')}>Gallery</button></div></div>
    <div className={view === 'gallery' ? 'work-gallery' : 'work-list'}>{projects.map((project, index) => <article key={project.slug} className={`work-item ${filter !== 'All' && filter !== project.discipline ? 'dimmed' : ''}`}>
      <Link href={`/work/${project.slug}`} className="project-link" onFocus={() => setPreview(project)} onBlur={() => setPreview(null)} onPointerEnter={e => { if (e.pointerType === 'mouse') setPreview(project); }}>
        {view === 'gallery' && <ProjectMedia project={project} />}
        <div className="project-line"><span className="project-number">{String(index + 1).padStart(2, '0')}</span><h2 style={{ viewTransitionName: `title-${project.slug}` }}>{project.title}</h2><span className="project-discipline">{project.discipline}</span><span className="project-arrow" aria-hidden="true">↗</span></div>
        <p className="project-description">{project.description}</p>
      </Link>
    </article>)}</div>
    {preview?.image && view === 'index' && <HoverPreview project={preview} container={root} />}
  </div>;
}
