'use client';
import { useEffect, type RefObject } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { ProjectMedia } from './ProjectMedia';
import type { Project } from '@/lib/content';
import { spring } from '@/lib/motion';
export default function HoverPreview({ project, container }: { project: Project; container: RefObject<HTMLDivElement | null> }) {
  const reduce = useReducedMotion(), x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, spring), sy = useSpring(y, spring);
  const transform = useTransform([sx, sy], ([a, b]) => `translate(${a}px, ${b}px)`);
  useEffect(() => {
    const node = container.current;
    if (!node || reduce) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = node.getBoundingClientRect(); x.set(Math.min(e.clientX - r.left + 24, r.width - 340)); y.set(e.clientY - r.top - 100);
    };
    node.addEventListener('pointermove', move);
    return () => node.removeEventListener('pointermove', move);
  }, [container, reduce, x, y]);
  return <motion.div className="hover-preview" style={{ transform: reduce ? undefined : transform }} aria-hidden="true"><ProjectMedia project={project} /></motion.div>;
}
