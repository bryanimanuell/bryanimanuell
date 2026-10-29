'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion, useTransform } from 'motion/react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { spring } from '@/lib/motion';
export default function MagneticEmail({ email }: { email: string }) {
  const ref = useRef<HTMLAnchorElement>(null), reduce = useReducedMotion();
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, spring), sy = useSpring(y, spring);
  const transform = useTransform([sx, sy], ([a, b]) => `translate(${a}px, ${b}px)`);
  return <motion.a ref={ref} className="lens-button" href={`mailto:${email}`} aria-label="Let's talk by email" style={{ transform }} onPointerMove={e => {
    if (reduce || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const r = ref.current!.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * .2); y.set((e.clientY - r.top - r.height / 2) * .2);
  }} onPointerLeave={() => { x.set(0); y.set(0); }}><ArrowUpRight size={64} weight="light" /></motion.a>;
}
