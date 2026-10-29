import type { Metadata } from 'next';
import { LabBoard } from '@/components/ui/LabBoard';
import { Contact } from '@/components/ui/Contact';
export const metadata: Metadata = { title: 'Lab', description: 'Small experiments in frames, typography, and interaction.' };
export default function Lab() { return <main id="main"><section className="section page-intro lab-intro"><h1>A place<br /><span className="light">to play.</span></h1><p className="intro-copy">Small studies in the ingredients of this portfolio. Perhaps a future deployment? I mean, who knows?</p><LabBoard /></section><Contact /></main>; }
