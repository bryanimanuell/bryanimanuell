'use client';
import { useEffect, useRef } from 'react';
export function ChapterNav() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const headings = document.querySelectorAll('.case-prose h2');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        ref.current?.querySelectorAll('a').forEach(a => a.setAttribute('aria-current', a.hash === `#${entry.target.id}` ? 'location' : 'false'));
      }
    }, { rootMargin: '-15% 0px -60% 0px' });
    headings.forEach(h => observer.observe(h)); return () => observer.disconnect();
  }, []);
  return <nav ref={ref} className="chapters" aria-label="Case study chapters">{['Brief', 'Approach', 'Engineering', 'Outcome'].map(label => <a key={label} href={`#${label.toLowerCase()}`}><span aria-hidden="true" />{label}</a>)}</nav>;
}
