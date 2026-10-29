'use client';
import { Dialog } from '@base-ui/react/dialog';
import { Link } from './Link';
import { usePathname } from 'next/navigation';
const links = [['Work', '/work'], ['About', '/about'], ['Lab', '/lab'], ['Writing', '/writing'], ["Let's talk", '/contact']];
export default function Menu({ onClose }: { onClose: () => void }) {
  const path = usePathname();
  return <Dialog.Root open onOpenChange={open => { if (!open) onClose(); }}><Dialog.Portal><Dialog.Backdrop className="menu-backdrop" /><Dialog.Popup className="menu-panel"><div className="menu-top"><Dialog.Title>Navigation</Dialog.Title><Dialog.Close>Close</Dialog.Close></div><Dialog.Description className="sr-only">Pages in Bryan Imanuel&apos;s portfolio</Dialog.Description><nav aria-label="Mobile navigation">{links.map(([name, href]) => <Link key={href} href={href} onClick={onClose} aria-current={path.startsWith(href) ? 'page' : undefined}>{name}</Link>)}</nav></Dialog.Popup></Dialog.Portal></Dialog.Root>;
}
