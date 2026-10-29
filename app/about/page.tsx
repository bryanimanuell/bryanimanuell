import type { Metadata } from 'next';
import { FrameSequence } from '@/components/scroll/FrameSequence';
import { Contact } from '@/components/ui/Contact';
import { ReadingManifesto } from '@/components/ui/ReadingManifesto';
export const metadata: Metadata = { title: 'About', description: 'The person behind the work. Bryan Imanuel on interfaces, motion, and software.' };
export default function About() {
  return <main id="main"><FrameSequence reverse />
    <section className="section manifesto" id="perspective"><p className="mono">My perspective</p><ReadingManifesto /><p className="draft-note">Rejecting the compromise between a website that works flawlessly and one that looks beautiful.</p></section>
    <section className="section principles" aria-label="Working principles">{[
      ['Fast is a feature.', 'A responsive interface respects the person using it. I want the interaction to keep up with the intention.'],
      ['Details are the product.', 'The spacing, the empty state, the last keyboard interaction. Those are part of the work, too.'],
      ['Motion explains.', 'Movement should make a change easier to understand. The useful question is always what it helps someone see.'],
    ].map(([title, body]) => <article className="principle" key={title}><h2>{title}</h2><p>{body}</p></article>)}</section>
    <section className="section background-section"><h2 className="section-title">The background.</h2><div className="offset-copy"><p>Software engineering, with an interest in how things look, move, and work.</p><p className="muted">Experience details and the full biography are coming soon.</p></div><dl className="toolkit"><div><dt>Interfaces</dt><dd>Frontend development<br />Interaction design</dd></div><div><dt>Systems</dt><dd>PostgreSQL<br />Role-based workflows</dd></div><div><dt>Delivery</dt><dd>Jest · GitHub Actions<br />Vercel</dd></div></dl></section><Contact /></main>;
}
