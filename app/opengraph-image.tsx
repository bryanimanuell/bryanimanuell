import { ImageResponse } from 'next/og';
export const alt = 'Bryan Imanuel. Software Engineer.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() { return new ImageResponse(<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', padding: 70, background: '#0d0b0b', color: '#ede9e4' }}><div style={{ display: 'flex', fontSize: 28 }}>Software Engineer</div><div style={{ display: 'flex', flexDirection: 'column', fontSize: 118, lineHeight: .95, letterSpacing: -5 }}><span>BRYAN</span><span style={{ color: '#e03529' }}>IMANUEL</span></div><div style={{ display: 'flex', fontSize: 25 }}>Interfaces with a little perspective.</div></div>, size); }
