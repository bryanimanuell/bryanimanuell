'use client';
import { Link as TransitionLink } from 'next-view-transitions';
import type { ComponentProps } from 'react';
export function Link(props: ComponentProps<typeof TransitionLink>) {
  return <TransitionLink {...props} />;
}
