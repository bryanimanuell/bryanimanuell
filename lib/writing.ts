import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';
import { z } from 'zod';
const schema = z.object({ title: z.string(), description: z.string(), date: z.string(), published: z.boolean().default(false) });
const directory = path.join(process.cwd(), 'content/writing');
export function getArticle(slug: string) {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const file = path.join(directory, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(fs.readFileSync(file, 'utf8'));
  if (!match) throw new Error(`Missing article frontmatter: ${slug}`);
  const meta = schema.parse(parse(match[1]));
  return meta.published ? { meta, content: match[2], slug } : null;
}
export function getArticles() {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory).filter(f => f.endsWith('.mdx')).map(f => getArticle(f.slice(0, -4))).filter(a => a !== null).sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}
