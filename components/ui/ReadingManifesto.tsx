import type { CSSProperties } from 'react';
const lines = ['High utility', 'Meets', 'High fidelity.'];
export function ReadingManifesto() {
  let index = 0;
  return <h2 className="reading-manifesto">{lines.map(line => <span className="reading-line" key={line}>{line.split(' ').map(word => {
    const start = 10 + index++ * 2;
    return <span key={word} className="reading-word" style={{ animationRange: `cover ${start}% cover ${start + 12}%` } as CSSProperties}>{word} </span>;
  })}</span>)}</h2>;
}
