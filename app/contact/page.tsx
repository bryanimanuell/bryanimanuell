import type { Metadata } from 'next';
import { Contact } from '@/components/ui/Contact';
export const metadata: Metadata = { title: "Let's talk" };
export default function ContactPage() { return <main id="main"><Contact full /></main>; }
