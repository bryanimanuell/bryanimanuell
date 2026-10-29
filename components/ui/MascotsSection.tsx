'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LineReveal } from '@/components/scroll/LineReveal';

export interface MascotPersona {
  id: string;
  name: string;
  expression: string;
  role: string;
  description: string;
  image: string;
  alt: string;
  tag: string;
}

export const MASCOTS: MascotPersona[] = [
  {
    id: 'glasses',
    name: 'Shades On',
    expression: 'Dark shades · laser focus',
    role: 'Deep Focus & Systems',
    description:
      'The locked-in builder persona. Zero distraction, rigorous typography, robust architectures, and uncompromising speed.',
    image: '/mascots/glasses.png',
    alt: 'Oxblood mascot wearing dark sunglasses, focused and confident',
    tag: '01 / FOCUS',
  },
  {
    id: 'smile',
    name: 'Shades Off',
    expression: 'Wide eyes · genuine warmth',
    role: 'Humane Perspective',
    description:
      'The candid, empathetic eye. Building for real people, clear accessibility, intuitive feedback, and collaborative care.',
    image: '/mascots/smile.png',
    alt: 'Oxblood mascot smiling with wide friendly eyes',
    tag: '02 / HUMANE',
  },
  {
    id: 'eyebrow',
    name: 'The Critique',
    expression: 'Raised eyebrow · scrutinizing',
    role: 'Detail & Observation',
    description:
      'The auditor. Questioning the extra 100ms, tracking layout shifts, edge cases, and the subtle friction nobody else notices.',
    image: '/mascots/eyebrow.png',
    alt: 'Oxblood mascot with an inquisitive raised eyebrow',
    tag: '03 / AUDIT',
  },
  {
    id: 'smirk',
    name: 'The Craft',
    expression: 'Playful smirk · ready to build',
    role: 'Motion & Delight',
    description:
      'The kinetic spark. Finding tactile physics, fluid spring transitions, and interactive joy that makes software feel alive.',
    image: '/mascots/smirk.png',
    alt: 'Oxblood mascot smirking with creative confidence',
    tag: '04 / CRAFT',
  },
];

export function MascotsSection() {
  const [activeId, setActiveId] = useState<string>('glasses');
  const activeMascot = MASCOTS.find((m) => m.id === activeId) ?? MASCOTS[0];

  return (
    <section className="section mascots-section" id="persona" aria-label="Mascots and Personas">
      <div className="mascots-header">
        <p className="mono">02 / Mascot &amp; Alter Ego</p>
        <LineReveal>
          <h2 className="section-title">
            Character in<br />
            <span className="light">four frames.</span>
          </h2>
        </LineReveal>
        <p className="mascots-subtitle">
          Just as the portrait sequence shifts between shades on and shades off, the work balances
          laser focus with genuine play. Four expressions of the oxblood companion.
        </p>
      </div>

      <div className="mascots-stage">
        {/* Main interactive spotlight card */}
        <div className="mascot-spotlight" data-active={activeMascot.id}>
          <div className="spotlight-halo" aria-hidden="true" />
          <div className="spotlight-viewport">
            <Image
              src={activeMascot.image}
              alt={activeMascot.alt}
              width={340}
              height={340}
              priority
              className="spotlight-image"
            />
          </div>
          <div className="spotlight-meta">
            <span className="mono spotlight-tag">{activeMascot.tag}</span>
            <h3 className="spotlight-title">{activeMascot.name}</h3>
            <p className="spotlight-role mono">{activeMascot.role}</p>
            <p className="spotlight-desc">{activeMascot.description}</p>
            <div className="spotlight-details mono">
              <span>EXPRESSION: {activeMascot.expression}</span>
              <span>RENDER: 340&times;340 · OXBLOOD</span>
            </div>
          </div>
        </div>

        {/* 4-card selector row */}
        <div className="mascots-grid" role="tablist" aria-label="Mascot moods">
          {MASCOTS.map((mascot) => {
            const isSelected = mascot.id === activeId;
            return (
              <button
                key={mascot.id}
                role="tab"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                className={`mascot-card ${isSelected ? 'active' : ''}`}
                onClick={() => setActiveId(mascot.id)}
              >
                <div className="card-top">
                  <span className="mono card-tag">{mascot.tag}</span>
                  <span className="mono card-indicator" aria-hidden="true">
                    {isSelected ? '● ACTIVE' : '○ SELECT'}
                  </span>
                </div>
                <div className="card-image-wrap">
                  <Image
                    src={mascot.image}
                    alt=""
                    width={180}
                    height={180}
                    className="card-thumb"
                  />
                </div>
                <div className="card-info">
                  <h4 className="card-title">{mascot.name}</h4>
                  <p className="card-role mono">{mascot.role}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
