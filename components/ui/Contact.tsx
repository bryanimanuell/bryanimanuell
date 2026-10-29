import { site } from '@/lib/site';
export async function Contact({ full = false }: { full?: boolean }) {
  const actions = site.email ? await import('./ContactActions') : null;
  const Heading = full ? 'h1' : 'h2';
  return <section className={`contact-finale ${full ? 'contact-full' : ''}`} aria-label="Contact">
    <div className="finale-title"><Heading>Let&apos;s<br /><span>talk.</span></Heading>{actions && <actions.MagneticEmail email={site.email} />}</div>
    <div className="contact-details">{actions ? <><a className="email" href={`mailto:${site.email}`}>{site.email}</a><actions.CopyEmail email={site.email} /></> : <p className="contact-pending">Contact details coming soon.</p>}</div>
    <div className="finale-bottom"><div>{site.github && <a href={site.github}>GitHub</a>}{site.linkedin && <a href={site.linkedin}>LinkedIn</a>}</div><span>© 2026 Bryan Imanuel</span></div>
  </section>;
}
