'use client';
import { useEffect, useRef, type ReactNode } from 'react';
export function LineReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current!;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.animate([{ opacity: 0, transform: 'translateY(24px)', clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0)' }], { duration: 900, easing: 'cubic-bezier(.23,1,.32,1)' });
        observer.disconnect();
      }
    }, { threshold: .1 });
    observer.observe(node); return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
