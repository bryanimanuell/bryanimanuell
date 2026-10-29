import { ImageResponse } from 'next/og';
import { getProject } from '@/lib/content';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Selected work by Bryan Imanuel';
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  return new ImageResponse(<div style={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-between', padding: 70, color: '#ede9e4', background: '#0d0b0b' }}><div style={{ fontSize: 26, display: 'flex' }}>Bryan Imanuel · Selected work</div><div style={{ fontSize: 112, display: 'flex', letterSpacing: -5 }}>{project?.meta.title || 'Selected work'}</div><div style={{ fontSize: 28, color: '#a29a95', display: 'flex' }}>{project?.meta.description}</div></div>, size);
}
