import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';
import { z } from 'zod';
const schema = z.object({
  title: z.string(), slug: z.string(), discipline: z.enum(['Product', 'Frontend', 'Full-stack']),
  description: z.string(), stack: z.array(z.string()).default([]),
  image: z.string().default(''), live: z.string().default(''), source: z.string().default(''),
  status: z.string().default('Case study in progress'),
});
export type Project = z.infer<typeof schema>;
export function getProjects(): Project[] {
  return ['aggre', 'yogurt', 'ootd'].map(slug => getProject(slug)!.meta);
}
export function getProject(slug: string) {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const file = path.join(process.cwd(), 'content/work', `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const source = fs.readFileSync(file, 'utf8');
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(source);
  if (!match) throw new Error(`Missing project frontmatter: ${slug}`);
  return { meta: schema.parse(parse(match[1])), content: match[2] };
}
