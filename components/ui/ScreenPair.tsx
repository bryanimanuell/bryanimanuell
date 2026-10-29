'use client';

import { ScreenCard } from './ScreenCard';

interface ScreenPairProps {
  leftSrc?: string;
  leftTitle?: string;
  leftCaption?: string;
  leftTag?: string;
  rightSrc?: string;
  rightTitle?: string;
  rightCaption?: string;
  rightTag?: string;
  left?: {
    src: string;
    title: string;
    caption?: string;
    tag?: string;
  };
  right?: {
    src: string;
    title: string;
    caption?: string;
    tag?: string;
  };
}

export function ScreenPair({ 
  leftSrc, leftTitle, leftCaption, leftTag,
  rightSrc, rightTitle, rightCaption, rightTag,
  left, right 
}: ScreenPairProps) {
  const finalLeft = {
    src: leftSrc || left?.src || '',
    title: leftTitle || left?.title || '',
    caption: leftCaption || left?.caption,
    tag: leftTag || left?.tag
  };

  const finalRight = {
    src: rightSrc || right?.src || '',
    title: rightTitle || right?.title || '',
    caption: rightCaption || right?.caption,
    tag: rightTag || right?.tag
  };

  return (
    <div className="screen-pair-grid">
      <ScreenCard 
        src={finalLeft.src}
        title={finalLeft.title}
        caption={finalLeft.caption}
        tag={finalLeft.tag}
      />
      <ScreenCard 
        src={finalRight.src}
        title={finalRight.title}
        caption={finalRight.caption}
        tag={finalRight.tag}
      />
    </div>
  );
}
