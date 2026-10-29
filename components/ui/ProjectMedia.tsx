import Image from 'next/image';
import type { Project } from '@/lib/content';
export function ProjectMedia({ project, priority = false }: { project: Project; priority?: boolean }) {
  return <div className={`project-media media-${project.slug}`} style={{ viewTransitionName: `media-${project.slug}` }}>
    {project.image ? <Image src={project.image} alt={`${project.title} interface`} fill sizes="(max-width: 767px) 100vw, 70vw" priority={priority} /> : <div className="media-placeholder"><span>{project.title}</span><small>Project imagery coming soon</small></div>}
  </div>;
}
