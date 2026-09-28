/**
 * Visual showcase — click-expand + carousel (Bryan pivot)
 * Branch: enhance/visual-showcase. No push until Bryan approves.
 *
 * Gates:
 * - order: Luvre Paris → Greek Yoghurt Shop → Job Board Platform
 * - collapsed cards: no visible screenshot image
 * - data-gallery multi-shot (≥2) with files on disk
 * - click expands: grid.is-expanded, featured + asides, gallery shown + carousel
 * - looks-only: no copy/IA drift
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { JSDOM } from 'jsdom';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const LOCKED_ACCOMPLISHMENT =
  'Shipped procurement features across 20+ hospital clients, integrating 40+ APIs.';
const EXPECTED_ORDER = ['Luvre Paris', 'Greek Yoghurt Shop', 'Job Board Platform'];
const MIN_GALLERY = { 'Luvre Paris': 4, 'Greek Yoghurt Shop': 5, 'Job Board Platform': 2 };

const LOCKED_DESCS = {
  'Luvre Paris':
    'Premium-grade ecommerce frontend for a Luvre Paris brand. Features a modern, sleek, and conversion-focused design system with modern ecommerce functionality.',
  'Greek Yoghurt Shop':
    'A premium-grade ecommerce frontend for a Greek yoghurt brand. Features a playful, health-conscious, and conversion-focused design system with modern ecommerce functionality.',
  'Job Board Platform':
    'A full-stack job board with role-based dashboards for companies and applicants. Features debounced real-time search, automated emails via Resend, PostgreSQL RLS, and a CI/CD pipeline with Jest & GitHub Actions — deployed on Vercel.',
};

function workCards(document) {
  return [...document.querySelectorAll('#work .project-card')];
}

function cardTitle(card) {
  return card.querySelector('h3')?.textContent.trim() ?? '';
}

function parseGallery(card) {
  const raw = card.getAttribute('data-gallery');
  if (!raw) return [];
  try {
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function loadDom() {
  return new JSDOM(readFileSync(join(root, 'index.html'), 'utf8'), {
    url: 'https://bryanimanuell.vercel.app/',
  });
}

/** Run portfolio script as if DOMContentLoaded already fired. */
function loadInteractiveDom() {
  const html = readFileSync(join(root, 'index.html'), 'utf8');
  const dom = new JSDOM(html, {
    url: 'https://bryanimanuell.vercel.app/',
    runScripts: 'dangerously',
    pretendToBeVisual: true,
  });
  // jsdom stubs for portfolio script
  dom.window.HTMLElement.prototype.scrollIntoView = () => {};
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  dom.window.IntersectionObserver = IO;
  if (!dom.window.matchMedia) {
    dom.window.matchMedia = () => ({
      matches: false,
      media: '',
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
    });
  }

  let script = readFileSync(join(root, 'script.js'), 'utf8').trim();
  if (!script.startsWith("document.addEventListener('DOMContentLoaded'") &&
      !script.startsWith('document.addEventListener("DOMContentLoaded"')) {
    throw new Error('script.js DOMContentLoaded wrapper changed — update test harness');
  }
  // Strip outer document.addEventListener('DOMContentLoaded', () => { ... });
  script = script
    .replace(/^document\.addEventListener\(\s*['"]DOMContentLoaded['"]\s*,\s*\(\)\s*=>\s*\{/, '')
    .replace(/\}\);\s*$/, '');
  dom.window.eval(script);
  return dom;
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
    expect(titles.slice(0, 3)).toEqual(EXPECTED_ORDER);
  });
});

describe('visual showcase — collapsed cards hide screenshots', () => {
  it('first three cards have gallery hidden and no visible screenshot img outside gallery', () => {
    const { document } = loadDom().window;
    for (const card of workCards(document).slice(0, 3)) {
      const title = cardTitle(card);
      const gallery = card.querySelector('.project-gallery');
      expect(gallery, `${title} needs .project-gallery`).toBeTruthy();
      expect(gallery.hidden, `${title} gallery must start hidden`).toBe(true);

      const visibleShots = [...card.querySelectorAll('img')].filter((img) => {
        if (img.classList.contains('project-icon')) return false;
        if (gallery.contains(img)) return false;
        const src = (img.getAttribute('src') || '').toLowerCase();
        return src && !src.includes('favicon');
      });
      expect(visibleShots, `${title} must not show screenshot on collapsed card`).toHaveLength(0);
    }
  });
});

describe('visual showcase — multi-shot data-gallery', () => {
  it('each showcase card has data-gallery with enough slides and files on disk', () => {
    const { document } = loadDom().window;
    for (const card of workCards(document).slice(0, 3)) {
      const title = cardTitle(card);
      const slides = parseGallery(card);
      expect(slides.length, `${title} data-gallery length`).toBeGreaterThanOrEqual(MIN_GALLERY[title]);

      for (const src of slides) {
        expect(src).toMatch(/\.(png|jpe?g|webp)$/i);
        const file = join(root, src.replace(/^\.\//, ''));
        expect(existsSync(file), `${title} missing ${src}`).toBe(true);
        expect(statSync(file).size).toBeGreaterThan(1024);
      }

      expect(card.querySelector('.project-gallery-nav.prev')).toBeTruthy();
      expect(card.querySelector('.project-gallery-nav.next')).toBeTruthy();
      expect(card.querySelector('.project-gallery-close')).toBeTruthy();
      expect(card.querySelector('.project-gallery-dots')).toBeTruthy();
      expect(card.querySelector('.project-gallery-image')).toBeTruthy();
    }
  });
});

describe('visual showcase — click expand + carousel', () => {
  let dom;

  beforeEach(() => {
    dom = loadInteractiveDom();
  });

  afterEach(() => {
    dom?.window.close();
  });

  it('clicking a showcase card expands it and shifts siblings aside', () => {
    const { document } = dom.window;
    const grid = document.querySelector('#work .projects-grid');
    const [luvre, yoghurt, job] = workCards(document);
    expect(cardTitle(luvre)).toBe('Luvre Paris');

    luvre.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));

    expect(grid.classList.contains('is-expanded')).toBe(true);
    expect(luvre.classList.contains('is-featured')).toBe(true);
    expect(yoghurt.classList.contains('is-aside')).toBe(true);
    expect(job.classList.contains('is-aside')).toBe(true);

    const gallery = luvre.querySelector('.project-gallery');
    expect(gallery.hidden).toBe(false);
    expect(gallery.getAttribute('aria-hidden')).toBe('false');

    const img = luvre.querySelector('.project-gallery-image');
    expect(img.getAttribute('src')).toContain('assets/projects/luvre/');
  });

  it('carousel next advances the featured gallery slide', () => {
    const { document } = dom.window;
    const [luvre] = workCards(document);
    luvre.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));

    const img = luvre.querySelector('.project-gallery-image');
    const first = img.getAttribute('src');
    luvre.querySelector('.project-gallery-nav.next').dispatchEvent(
      new dom.window.MouseEvent('click', { bubbles: true }),
    );
    const second = img.getAttribute('src');
    expect(second).not.toBe(first);
    expect(second).toContain('assets/projects/luvre/');
  });

  it('close collapses expand state', () => {
    const { document } = dom.window;
    const grid = document.querySelector('#work .projects-grid');
    const [luvre] = workCards(document);
    luvre.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
    luvre.querySelector('.project-gallery-close').dispatchEvent(
      new dom.window.MouseEvent('click', { bubbles: true }),
    );
    expect(grid.classList.contains('is-expanded')).toBe(false);
    expect(luvre.classList.contains('is-featured')).toBe(false);
    expect(luvre.querySelector('.project-gallery').hidden).toBe(true);
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
