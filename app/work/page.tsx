import { Suspense } from 'react';
import type { Metadata } from 'next';
import { WorkIndex } from '@/components/ui/WorkIndex';
import { Contact } from '@/components/ui/Contact';
import { getProjects } from '@/lib/content';
import { SelectedWork } from '@/components/ui/SelectedWork';
export const metadata: Metadata = { title: 'Selected work', description: 'Aggre, YoGurt, and OOTD: selected software projects by Bryan Imanuel.' };
export default function Work() {
  return <main id="main"><section className="section page-intro"><h1>Selected<br /><span className="light">work.</span></h1><p className="intro-copy">Procurement, ecommerce, and the search for what comes next.</p><Suspense fallback={<><div className="work-controls" aria-hidden="true"><div className="filters"><span>All</span><span>Product</span><span>Frontend</span><span>Full-stack</span></div><div className="view-toggle"><span>Index</span><span>Gallery</span></div></div><SelectedWork projects={getProjects()} /></>}><WorkIndex projects={getProjects()} /></Suspense></section><Contact /></main>;
}
