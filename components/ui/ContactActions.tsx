'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
export const MagneticEmail = dynamic(() => import('./MagneticEmail'));
export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState('');
  return <><button className="copy-button" onClick={async () => {
    try { await navigator.clipboard.writeText(email); setStatus('Copied'); }
    catch { setStatus('Copy unavailable. Select the email address to copy it.'); }
  }}>{status === 'Copied' ? 'Copied' : 'Copy email'}</button><span role="status" className={status.startsWith('Copy unavailable') ? 'copy-error' : 'sr-only'}>{status}</span></>;
}
