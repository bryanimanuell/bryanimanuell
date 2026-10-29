'use client';
export default function ErrorPage({ reset }: { reset: () => void }) { return <main id="main" className="section page-intro"><h1>Something<br />went wrong.</h1><p className="intro-copy">The page couldn&apos;t load. Try it once more.</p><button className="text-link" onClick={reset}>Try again</button></main>; }
