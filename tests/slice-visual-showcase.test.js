/**
 * Looks-only visual showcase (plan pivot — Tinky Winky)
 * Branch: enhance/visual-showcase off main. No push until Bryan approves.
 *
 * Gates:
 * - work order first three: Luvre Paris → Greek Yoghurt Shop → Job Board Platform
 * - each of those three has a project screenshot image
 * - looks-only: no copy/IA drift vs slice 1 locked content
 * - slice 1 suite still green (run separately)
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { JSDOM } from 'jsdom';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const LOCKED_ACCOMPLISHMENT =
  'Shipped procurement features across 20+ hospital clients, integrating 40+ APIs.';
const EXPECTED_ORDER = ['Luvre Paris', 'Greek Yoghurt Shop', 'Job Board Platform'];

/** Locked blurbs from main@df01ec0 — looks-only must not rewrite copy */
const LOCKED_DESCS = {
  'Luvre Paris':
    'Premium-grade ecommerce frontend for a Luvre Paris brand. Features a modern, sleek, and conversion-focused design system with modern ecommerce functionality.',
  'Greek Yoghurt Shop':
    'A premium-grade ecommerce frontend for a Greek yoghurt brand. Features a playful, health-conscious, and conversion-focused design system with modern ecommerce functionality.',
  'Job Board Platform':
    'A full-stack job board with role-based dashboards for companies and applicants. Features debounced real-time search, automated emails via Resend, PostgreSQL RLS, and a CI/CD pipeline with Jest & GitHub Actions — deployed on Vercel.',
};

function loadDom() {
  return new JSDOM(readFileSync(join(root, 'index.html'), 'utf8'), {
    url: 'https://bryanimanuell.vercel.app/',
  });
}

function workCards(document) {
  return [...document.querySelectorAll('#work .project-card')];
}

function cardTitle(card) {
  return card.querySelector('h3')?.textContent.trim() ?? '';
}

describe('visual showcase — branch', () => {
  it('is on enhance/visual-showcase (not main)', () => {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: root }).toString().trim();
    expect(branch).toBe('enhance/visual-showcase');
  });
});

describe('visual showcase — selected work order', () => {
  it('first three work cards are Luvre Paris → Greek Yoghurt Shop → Job Board Platform', () => {
    const { document } = loadDom().window;
    const titles = workCards(document).map(cardTitle);
    expect(titles.length).toBeGreaterThanOrEqual(3);
    expect(titles.slice(0, 3)).toEqual(EXPECTED_ORDER);
  });
});

describe('visual showcase — screenshots', () => {
  it('each of the first three cards has a screenshot image asset that exists on disk', () => {
    const { document } = loadDom().window;
    const cards = workCards(document).slice(0, 3);

    cards.forEach((card, i) => {
      const title = cardTitle(card);
      const shot =
        card.querySelector('img.project-screenshot, .project-screenshot img, [data-project-screenshot]') ||
        null;
      expect(shot, `${title} needs img.project-screenshot (or data-project-screenshot)`).toBeTruthy();

      const src = shot.getAttribute('src') || shot.getAttribute('data-src') || '';
      expect(src, `${title} screenshot src missing`).toMatch(/\.(png|jpe?g|webp)$/i);
      expect(src.toLowerCase()).not.toMatch(/favicon/);

      const file = join(root, src.replace(/^\.\//, ''));
      expect(existsSync(file), `${title} screenshot file missing: ${src}`).toBe(true);
      expect(statSync(file).size, `${title} screenshot empty`).toBeGreaterThan(1024);
    });
  });
});

describe('visual showcase — looks-only (no copy / IA drift)', () => {
  it('keeps locked content.json accomplishment and name/role', () => {
    const content = JSON.parse(readFileSync(join(root, 'content.json'), 'utf8'));
    expect(content.name).toBe('Bryan Imanuel');
    expect(content.role).toBe('Software Engineer');
    expect(content.accomplishment).toBe(LOCKED_ACCOMPLISHMENT);
  });

  it('keeps nav exactly home / work / about / contact', () => {
    const { document } = loadDom().window;
    const labels = [...document.querySelectorAll('.nav-links a')].map((a) =>
      a.textContent.trim().toLowerCase(),
    );
    expect(labels).toEqual(['home', 'work', 'about', 'contact']);
  });

  it('does not rewrite the three showcase project blurbs', () => {
    const { document } = loadDom().window;
    for (const card of workCards(document)) {
      const title = cardTitle(card);
      if (!LOCKED_DESCS[title]) continue;
      const desc = card.querySelector('.project-desc')?.textContent.replace(/\s+/g, ' ').trim();
      expect(desc).toBe(LOCKED_DESCS[title]);
    }
  });

  it('does not add case-study detail routes', () => {
    const html = readFileSync(join(root, 'index.html'), 'utf8');
    expect(html).not.toMatch(/\/work\/[a-z0-9-]+/i);
    expect(existsSync(join(root, 'work'))).toBe(false);
  });
});
