import styles from './ToolsMarquee.module.css';

const TOOLS = [
  { name: 'HTML5', slug: 'html5' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'React', slug: 'react' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'Tailwind CSS', slug: 'tailwindcss' },
  { name: 'Figma', slug: 'figma' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'Git', slug: 'git' },
];

export function ToolsMarquee() {
  return (
    <section className={styles.tools} aria-labelledby="tools-title">
      <h2 id="tools-title" className="sr-only">Tools and technologies</h2>
      <div className={styles.marquee}>
        <ul className={styles.marqueeTrack}>
          {TOOLS.map(tool => (
            <li key={tool.slug}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${tool.slug}/9b9d99`}
                alt={tool.name}
                height="28"
                loading="lazy"
              />
            </li>
          ))}
        </ul>
        <ul className={styles.marqueeTrack} aria-hidden="true">
          {TOOLS.map((tool, i) => (
            <li key={`clone-${tool.slug}-${i}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${tool.slug}/9b9d99`}
                alt=""
                height="28"
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
