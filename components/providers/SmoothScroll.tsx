'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
export function SmoothScroll() {
  const pathname = usePathname();
  useEffect(() => {
    let stopped = false;
    let cleanup = () => {};
    const media = matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)');
    const init = async () => {
      cleanup();
      if (media.matches) return;
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]);
      if (stopped || media.matches) return;
      const lenis = new Lenis({ autoRaf: false, lerp: .1, anchors: true });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(tick);
      cleanup = () => { gsap.ticker.remove(tick); lenis.destroy(); };
    };
    const engage = () => { void init(); };
    window.addEventListener('wheel', engage, { once: true, passive: true });
    media.addEventListener('change', init);
    return () => { stopped = true; cleanup(); window.removeEventListener('wheel', engage); media.removeEventListener('change', init); };
  }, [pathname]);
  useEffect(() => {
    const title = document.title;
    const listener = () => { document.title = document.hidden ? 'Shades on. See you soon.' : title; };
    document.addEventListener('visibilitychange', listener);
    return () => document.removeEventListener('visibilitychange', listener);
  }, [pathname]);
  useEffect(() => {
    const listener = (e: PromiseRejectionEvent) => {
      const msg = e.reason?.message ?? '';
      if ((e.reason?.name === 'TimeoutError' || e.reason?.name === 'AbortError') && msg.includes('Transition was aborted')) {
        e.preventDefault();
      }
    };
    window.addEventListener('unhandledrejection', listener);
    return () => window.removeEventListener('unhandledrejection', listener);
  }, []);
  return null;
}
