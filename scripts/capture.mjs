import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('docs/screenshots', { recursive: true });
const browser = await chromium.launch({ channel: process.platform === 'win32' ? 'chrome' : undefined });
try {
  for (const [name, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    for (const route of ['/', '/work', '/about', '/lab', '/contact']) {
      await page.goto(`http://localhost:3000${route}`);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `docs/screenshots/${route.slice(1) || 'home'}-${name}.png`, fullPage: route !== '/' && route !== '/about' });
    }
    await page.goto('http://localhost:3000/work');
    await page.getByRole('button', { name: 'Gallery', exact: true }).click();
    await page.screenshot({ path: `docs/screenshots/gallery-${name}.png`, fullPage: true });
    await context.close();
  }
} finally { await browser.close(); }
