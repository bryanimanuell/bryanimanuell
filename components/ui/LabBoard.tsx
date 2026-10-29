'use client';
import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { frameUrl } from '@/lib/frames';

const LAB_MASCOTS = [
  { id: 'glasses', name: 'Glasses', mood: 'Shades On · Deep Focus', src: '/mascots/glasses.png', alt: 'Mascot wearing shades' },
  { id: 'smile', name: 'Smile', mood: 'Shades Off · Humane Perspective', src: '/mascots/smile.png', alt: 'Mascot smiling warmly' },
  { id: 'eyebrow', name: 'Eyebrow', mood: 'The Critique · 100ms Detail Audit', src: '/mascots/eyebrow.png', alt: 'Mascot raising an eyebrow inquisitively' },
  { id: 'smirk', name: 'Smirk', mood: 'The Spark · Kinetic Craft', src: '/mascots/smirk.png', alt: 'Mascot smirking with creative confidence' },
];

export function LabBoard() {
  const bounds = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(1);
  const [revealed, setRevealed] = useState(false);
  const [mascotIdx, setMascotIdx] = useState(0);
  const reduce = useReducedMotion();
  // <article className="lab-item"><div className="lab-frame">
  //   {/* eslint-disable-next-line @next/next/no-img-element */}
  //   <img src={frameUrl(frame, true)} width="540" height="304" alt={`Portrait sequence at frame ${frame}`} draggable="false" />
  // </div><h2>A change of perspective</h2><p>The portrait sequence, one frame at a time.</p><label className="lab-control">Frame {frame}<input type="range" min="1" max="179" step="2" value={frame} onPointerDown={e => e.stopPropagation()} onChange={e => setFrame(Number(e.target.value))} /></label></article>
  // <article className="lab-item type-experiment"><div className="type-stage"><span className={revealed ? 'revealed' : ''}>IN FOCUS.</span></div><h2>Type, in focus</h2><p>A line mask that makes a change of state visible.</p><button className="text-link" onPointerDown={e => e.stopPropagation()} onClick={() => setRevealed(!revealed)}>{revealed ? 'Reset type' : 'Reveal type'}</button></article>
  return <div className="lab-viewport"><div className="lab-board">
    <article className="lab-item mascot-item"><div className="mascot-stage-lab">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={LAB_MASCOTS[mascotIdx].src} width="200" height="200" alt={LAB_MASCOTS[mascotIdx].alt} draggable="false" className="mascot-lab-img" />
    </div><h2>The Mascot studies</h2><p>{LAB_MASCOTS[mascotIdx].mood}</p><div className="mascot-lab-switcher" role="radiogroup" aria-label="Mascot mood switcher">{LAB_MASCOTS.map((m, idx) => (
      <button key={m.id} role="radio" aria-checked={mascotIdx === idx} className={`mascot-pill ${mascotIdx === idx ? 'active' : ''}`} onPointerDown={e => e.stopPropagation()} onClick={() => setMascotIdx(idx)}>{m.name}</button>
    ))}</div></article>
  </div></div>;
}
