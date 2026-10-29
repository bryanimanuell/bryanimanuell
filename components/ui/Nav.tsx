'use client';
import { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Link } from './Link';
import dynamic from 'next/dynamic';
const Menu = dynamic(() => import('./Menu'), { ssr: false });
const links = [['Work', '/work'], ['About', '/about'], ['Lab', '/lab'], ['Writing', '/writing']];
export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  return <header className="nav"><Link href="/" className="wordmark" aria-label="Bryan Imanuel, home">Bryan Imanuel</Link>
    <nav aria-label="Main navigation" className="desktop-nav">{links.map(([name, href]) => <Link key={href} href={href} aria-current={path.startsWith(href) ? 'page' : undefined}>{name}</Link>)}<Link href="/contact" className="contact-link">Let&apos;s talk <span aria-hidden="true">↗</span></Link></nav>
    <button ref={trigger} className="menu-trigger" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(true)}>Menu</button>
    {open && <Menu onClose={() => { setOpen(false); trigger.current?.focus(); }} />}
  </header>;
}
