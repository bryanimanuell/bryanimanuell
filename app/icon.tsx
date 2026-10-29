import { ImageResponse } from 'next/og';
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';
export default function Icon() { return new ImageResponse(<div style={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0b0b', color: '#ede9e4', fontSize: 36, fontWeight: 700 }}>BI</div>, size); }
