import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main id="main" className="section page-intro not-found-layout">
      <div className="not-found-copy">
        <h1>Out of<br /><span className="light">frame.</span></h1>
        <p className="intro-copy">That page isn&apos;t here. Even the mascot has questions.</p>
        <Link className="text-link" href="/">Back home ↗</Link>
      </div>
      <div className="not-found-mascot" aria-hidden="true">
        <div className="not-found-halo" />
        <Image
          src="/mascots/eyebrow.png"
          alt=""
          width={220}
          height={220}
          priority
          className="not-found-img"
        />
        <span className="mono not-found-tag">404 // INQUISITIVE</span>
      </div>
    </main>
  );
}
