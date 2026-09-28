/**
 * Slice 1 — hero + IA + perf foundation
 * Plan (Tinky Winky) + locked copy (Bryan):
 * accomplishment = "Shipped procurement features across 20+ hospital clients, integrating 40+ APIs."
 * gates: content.json; hero name+role+accomplishment; nav home/work/about/contact;
 * no skills; no IDCard.webm; media ≤500KB; #work not #projects
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const LOCKED_ACCOMPLISHMENT =
  'Shipped procurement features across 20+ hospital clients, integrating 40+ APIs.';

function loadDom() {
  const html = readFileSync(join(root, 'index.html'), 'utf8');
  return new JSDOM(html, { url: 'https://bryanimanuell.vercel.app/' });
}

describe('slice 1 — content source', () => {
  it('provides content.json with name, role, and locked accomplishment line', () => {
    const path = join(root, 'content.json');
    expect(existsSync(path), 'content.json must exist as single source of truth').toBe(true);
    const content = JSON.parse(readFileSync(path, 'utf8'));
    expect(content.name?.trim().length).toBeGreaterThan(0);
    expect(content.role?.trim().length).toBeGreaterThan(0);
    expect(content.accomplishment?.trim()).toBe(LOCKED_ACCOMPLISHMENT);
  });
});

describe('slice 1 — hero above the fold', () => {
  let document;
  let content;

  beforeAll(() => {
    document = loadDom().window.document;
    const path = join(root, 'content.json');
    content = existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : null;
  });

  it('hero shows name, role, and dedicated accomplishment from content.json', () => {
    const hero = document.querySelector('.hero, #home, [data-section="hero"]');
    expect(hero, 'hero section must exist').toBeTruthy();
    expect(content, 'content.json required for hero assertions').toBeTruthy();

    const text = hero.textContent.replace(/\s+/g, ' ');
    expect(text).toContain(content.name);
    expect(text).toContain(content.role);

    const accomplishmentEl = hero.querySelector(
      '[data-accomplishment], .accomplishment, .hero-accomplishment',
    );
    expect(
      accomplishmentEl,
      'hero must expose data-accomplishment / .accomplishment / .hero-accomplishment',
    ).toBeTruthy();
    expect(accomplishmentEl.textContent.trim()).toBe(LOCKED_ACCOMPLISHMENT);
  });
});

describe('slice 1 — minimal IA nav', () => {
  it('nav is exactly home / work / about / contact', () => {
    const { document } = loadDom().window;
    const links = [...document.querySelectorAll('header nav a, .navbar nav a, .nav-links a')];
    const labels = links.map((a) => a.textContent.trim().toLowerCase());
    const hrefs = links.map((a) => (a.getAttribute('href') || '').toLowerCase());

    expect(labels).toEqual(['home', 'work', 'about', 'contact']);
    expect(hrefs.some((h) => h.includes('skill'))).toBe(false);
    expect(hrefs.some((h) => h.includes('experience'))).toBe(false);
  });
});

describe('slice 1 — no skills section', () => {
  it('page has no skills section or skills badge wall', () => {
    const { document } = loadDom().window;
    expect(document.querySelector('#skills, section.skills, [data-section="skills"]')).toBeNull();
    expect(document.querySelector('.skills-grid, .skill-category, .icon-list')).toBeNull();
  });
});

describe('slice 1 — first paint without 8mb video', () => {
  it('does not reference IDCard.webm anywhere in index.html', () => {
    const html = readFileSync(join(root, 'index.html'), 'utf8');
    expect(html.toLowerCase()).not.toMatch(/idcard\.webm/);
  });

  it('does not ship IDCard.webm in the repo', () => {
    expect(existsSync(join(root, 'IDCard.webm'))).toBe(false);
  });

  it('no video or image referenced from index.html exceeds 500KB', () => {
    const html = readFileSync(join(root, 'index.html'), 'utf8');
    const refs = [
      ...html.matchAll(/(?:src|href)=["']([^"']+\.(?:webm|mp4|png|jpg|jpeg|gif|webp))["']/gi),
    ].map((m) => m[1]);
    for (const rel of refs.filter((r) => !/^https?:\/\//i.test(r))) {
      const file = join(root, rel.replace(/^\.\//, ''));
      if (!existsSync(file)) continue;
      const kb = statSync(file).size / 1024;
      expect(kb, `${rel} is ${kb.toFixed(0)}KB — keep ≤500KB`).toBeLessThanOrEqual(500);
    }
  });
});

describe('slice 1 — work IA id', () => {
  it('exposes #work and removes #projects', () => {
    const { document } = loadDom().window;
    expect(document.querySelector('#work')).toBeTruthy();
    expect(document.querySelector('#projects')).toBeNull();
  });
});
