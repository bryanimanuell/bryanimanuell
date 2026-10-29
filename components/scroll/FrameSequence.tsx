'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { FRAME_COUNT, SHADES_ON_FRAME, frameOrder, frameUrl } from '@/lib/frames';
import { Link } from '@/components/ui/Link';
import styles from './FrameSequence.module.css';

const FORWARD_LINES: ReactNode[] = [
  <>Software Engineer</>,
  <>Passion for crafting<br />fluid interfaces</>,
  <>Driven by curiosity<br />& clean code</>,
  <>Shades on.<br />Focus on the work.</>,
];

const REVERSE_LINES: ReactNode[] = [
  <>The person behind the code, and the details I care about.</>,
  <>Looking closer at how things look, move, and work.</>,
  <>Every pixel, transition, and micro-interaction considered.</>,
  <>Taking off the shades.<br />Unfiltered perspective.</>,
];

export function FrameSequence({
  reverse = false,
  lines: customLines,
}: {
  reverse?: boolean;
  lines?: ReactNode[];
}) {
  const lines = customLines ?? (reverse ? REVERSE_LINES : FORWARD_LINES);
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const glowOverlay = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const section = root.current!, element = canvas.current!;
    const ctx = element.getContext('2d');
    if (!ctx) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let teardown = () => { };
    const setup = () => {
      teardown();
      if (media.matches) { section.dataset.ready = 'false'; section.dataset.cut = 'false'; return; }
      let disposed = false, drawn = -1, target = reverse ? FRAME_COUNT : 1, loaded = 0;
      const mobile = matchMedia('(max-width: 767px)').matches;
      const bitmaps = new Map<number, ImageBitmap>();
      const abort = new AbortController();
      let animation: { kill: () => void; revert: () => void } | undefined;
      const draw = (force = false) => {
        if (!bitmaps.size || disposed) return;
        const nearest = [...bitmaps.keys()].reduce((a, b) => Math.abs(a - target) < Math.abs(b - target) ? a : b);
        if (nearest === drawn && !force) return;
        drawn = nearest;
        const bitmap = bitmaps.get(nearest)!;
        const scale = Math.max(element.width / bitmap.width, element.height / bitmap.height);
        ctx.clearRect(0, 0, element.width, element.height);
        ctx.drawImage(bitmap, (element.width - bitmap.width * scale) / 2, element.height - bitmap.height * scale, bitmap.width * scale, bitmap.height * scale);
        section.dataset.ready = 'true';
      };
      const resize = new ResizeObserver(() => {
        const bounds = element.getBoundingClientRect();
        const dpr = Math.min(devicePixelRatio, 2);
        element.width = Math.round(bounds.width * dpr); element.height = Math.round(bounds.height * dpr);
        draw(true);
      });
      resize.observe(element);
      const queue = frameOrder(mobile, reverse);
      const count = queue.length;
      const worker = async () => {
        while (queue.length && !disposed) {
          const frame = queue.shift()!;
          try {
            const response = await fetch(frameUrl(frame, mobile), { signal: abort.signal });
            if (!response.ok) throw new Error('Frame unavailable');
            const bitmap = await createImageBitmap(await response.blob());
            if (disposed) { bitmap.close(); return; }
            bitmaps.set(frame, bitmap); loaded++;
            if (progress.current) progress.current.textContent = loaded === count ? '' : `Loading portrait ${Math.round(loaded / count * 100)}%`;
            draw();
          } catch {
            if (!disposed && progress.current) progress.current.textContent = 'Still portrait available';
          }
        }
      };
      const begin = async () => {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
          const state = { frame: target };
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: `+=${innerHeight * (mobile ? 1.4 : reverse ? 2 : 3)}`,
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          tl.to(state, {
            frame: reverse ? 1 : FRAME_COUNT,
            snap: 'frame',
            ease: 'none',
            duration: 1,
            onUpdate: () => {
              target = state.frame;
              draw();
              section.dataset.cut = String(reverse ? target < 45 : target >= SHADES_ON_FRAME);
            },
          }, 0);

          if (glowOverlay.current) {
            tl.fromTo(
              glowOverlay.current,
              { opacity: reverse ? 1 : 0, scale: reverse ? 1.25 : 1 },
              { opacity: reverse ? 0 : 1, scale: reverse ? 1 : 1.25, ease: 'none', duration: 1 },
              0
            );
          }

          const elements = lineRefs.current.filter((el): el is HTMLParagraphElement => Boolean(el));
          const lineCount = elements.length;
          if (lineCount > 1) {
            elements.forEach((el, i) => {
              if (i === 0) {
                gsap.set(el, { y: 0, opacity: 1, pointerEvents: 'auto' });
              } else {
                gsap.set(el, { y: 28, opacity: 0, pointerEvents: 'none' });
              }
            });

            const step = 1 / lineCount;
            const transDur = Math.min(0.08, step * 0.4);

            elements.forEach((el, i) => {
              if (i === 0) {
                const exitStart = step - transDur * 0.5;
                tl.to(el, { y: -28, opacity: 0, pointerEvents: 'none', ease: 'power2.in', duration: transDur }, exitStart);
              } else {
                const enterStart = i * step - transDur * 0.5;
                tl.to(el, { y: 0, opacity: 1, pointerEvents: 'auto', ease: 'power2.out', duration: transDur }, enterStart);

                if (i < lineCount - 1) {
                  const exitStart = (i + 1) * step - transDur * 0.5;
                  tl.to(el, { y: -28, opacity: 0, pointerEvents: 'none', ease: 'power2.in', duration: transDur }, exitStart);
                }
              }
            });
          }
        }, section);
        animation = context;
        void Promise.all([worker(), worker(), worker()]);
      };
      let started = false;
      const engage = () => { if (!started) { started = true; void begin(); } };
      const key = (event: KeyboardEvent) => { if (['ArrowDown', 'PageDown', ' ', 'End'].includes(event.key)) engage(); };
      window.addEventListener('wheel', engage, { passive: true });
      window.addEventListener('touchmove', engage, { passive: true });
      window.addEventListener('scroll', engage, { passive: true });
      window.addEventListener('keydown', key);
      const idleId = typeof requestIdleCallback !== 'undefined'
        ? requestIdleCallback(() => engage(), { timeout: 800 })
        : setTimeout(engage, 600);
      if (window.scrollY > 0) engage();
      teardown = () => {
        disposed = true;
        window.removeEventListener('wheel', engage);
        window.removeEventListener('touchmove', engage);
        window.removeEventListener('scroll', engage);
        window.removeEventListener('keydown', key);
        if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(idleId as number);
        else clearTimeout(idleId as ReturnType<typeof setTimeout>);
        abort.abort();
        resize.disconnect();
        animation?.revert();
        bitmaps.forEach(b => b.close());
      };
    };
    setup(); media.addEventListener('change', setup);
    return () => { teardown(); media.removeEventListener('change', setup); };
  }, [reverse, lines]);

  return <section ref={root} className={styles.hero} data-reverse={reverse} aria-label={reverse ? 'The person behind the work' : 'Introduction'}>
    <div className={styles.glow}>
      <div ref={glowOverlay} className={styles.glowOverlay} />
    </div>
    <h1 className={styles.name}>{reverse ? <><span>BEHIND</span><span>THE LENS.</span></> : <><span>BRYAN</span><span>IMANUEL</span></>}</h1>
    <div className={styles.portrait}>
      <picture className={styles.poster}>
        <source media="(prefers-reduced-motion: reduce) and (max-width: 767px)" srcSet={frameUrl(reverse ? 1 : 180, true)} />
        <source media="(prefers-reduced-motion: reduce)" srcSet={frameUrl(reverse ? 1 : 180)} />
        <source media="(max-width: 767px)" srcSet={frameUrl(reverse ? 180 : 1, true)} />
        {/* Canvas replaces this immediately visible LCP poster after its first decode. */}
        <img src={frameUrl(reverse ? 180 : 1)} alt={reverse ? 'Bryan Imanuel taking off his sunglasses' : 'Bryan Imanuel, wearing a black shirt'} width="960" height="540" fetchPriority="high" />
      </picture>
      <canvas ref={canvas} aria-hidden="true" />
    </div>
    <div className={styles.foreground}>
      <div className={styles.lines}>
        {lines.map((line, index) => (
          <p
            key={index}
            ref={el => { lineRefs.current[index] = el; }}
            className={styles.line}
          >
            {line}
          </p>
        ))}
      </div>
      <Link className="text-link" href={reverse ? '#perspective' : '/work'}>{reverse ? 'My perspective' : 'See the work'}<span aria-hidden="true">↗</span></Link>
    </div>
    <span ref={progress} className={styles.loading} aria-live="off" />
  </section>;
}
