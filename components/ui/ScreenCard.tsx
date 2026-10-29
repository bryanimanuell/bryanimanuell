'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowsOutSimple, X } from '@phosphor-icons/react';

interface ScreenCardProps {
  src: string;
  title: string;
  caption?: string;
  tag?: string;
  alt?: string;
  priority?: boolean;
}

export function ScreenCard({
  src,
  title,
  caption,
  tag,
  alt,
  priority = false
}: ScreenCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <figure className="inline-screen-card">
        <div 
          className="inline-screen-frame" 
          onClick={() => setOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && setOpen(true)}
          aria-label={`Enlarge ${title}`}
        >
          <div className="browser-chrome-bar compact">
            <div className="traffic-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <span className="browser-url-text">{title}</span>
            <div className="zoom-hint">
              <ArrowsOutSimple size={12} />
              <span>Zoom</span>
            </div>
          </div>
          <div className="screen-img-box">
            <Image
              src={src}
              alt={alt || title}
              width={1616}
              height={972}
              className="screen-img"
              sizes="(max-width: 1024px) 100vw, 840px"
              priority={priority}
            />
          </div>
        </div>
        {(caption || tag) && (
          <figcaption className="inline-screen-caption">
            {tag && <span className="mono tag-pill">{tag}</span>}
            {caption && <span className="caption-text">{caption}</span>}
          </figcaption>
        )}
      </figure>

      {open && (
        <div 
          className="yogurt-lightbox-backdrop" 
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <div className="lightbox-header">
              <div className="lightbox-meta">
                {tag && <span className="screen-cat-badge">{tag}</span>}
                <span className="lightbox-title">{title}</span>
              </div>
              <button 
                type="button" 
                className="lightbox-close-btn" 
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <div className="lightbox-image-wrap">
              <Image
                src={src}
                alt={alt || title}
                width={1616}
                height={972}
                priority
                className="lightbox-img"
              />
            </div>
            {caption && (
              <div className="lightbox-footer">
                <p className="lightbox-desc">{caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
