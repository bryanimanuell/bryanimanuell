import { Link } from './Link';
import type { Project } from '@/lib/content';
export function SelectedWork({ projects }: { projects: Project[] }) {
  return <div className="work-list">{projects.map((project, index) => <article className="work-item" key={project.slug}><Link href={`/work/${project.slug}`} className="project-link"><div className="project-line"><span className="project-number">{String(index + 1).padStart(2, '0')}</span><h3 style={{ viewTransitionName: `title-${project.slug}` }}>{project.title}</h3><span className="project-discipline">{project.discipline}</span><span className="project-arrow" aria-hidden="true">↗</span></div><p className="project-description">{project.description}</p></Link></article>)}</div>;
}
