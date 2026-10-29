import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes = ['/', '/work', '/work/aggre', '/work/yogurt', '/work/job-board', '/about', '/lab', '/writing', '/contact', '/colophon'];
for (const route of routes) test(`${route}: semantics, accessibility, and layout`, async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const response = await page.goto(route);
  expect(response?.status()).toBe(200);
  await expect(page.locator('h1')).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(v => ['serious', 'critical'].includes(v.impact ?? ''))).toEqual([]);
  expect(errors).toEqual([]);
});
test('work filtering preserves rows, gallery changes layout, project links navigate', async ({ page }) => {
  await page.goto('/work');
  await page.getByRole('button', { name: 'Frontend', exact: true }).click();
  await expect(page).toHaveURL(/discipline=Frontend/);
  await expect(page.locator('.work-item')).toHaveCount(3);
  await expect(page.locator('.work-item.dimmed')).toHaveCount(2);
  await page.getByRole('button', { name: 'Gallery', exact: true }).click();
  await expect(page.locator('.work-gallery .project-media')).toHaveCount(3);
  await page.getByRole('button', { name: 'All', exact: true }).click();
  await expect(page.locator('.work-item.dimmed')).toHaveCount(0);
  await page.getByRole('button', { name: 'Index', exact: true }).click();
  await expect(page.locator('.work-list')).toBeVisible();
  await page.getByRole('link', { name: /Aggre/ }).click();
  await expect(page).toHaveURL('/work/aggre');
  await page.getByRole('link', { name: 'Approach', exact: true }).click();
  await expect(page).toHaveURL(/#approach/);
  await page.getByRole('link', { name: /YoGurt/ }).click();
  await expect(page).toHaveURL('/work/yogurt');
});
test('mobile menu traps focus and restores it on Escape', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile');
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open navigation' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate(d => d.contains(document.activeElement))).toBeTruthy();
  }
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Work', exact: true }).click();
  await expect(page).toHaveURL('/work');
  await expect(dialog).not.toBeVisible();
});
test('reduced motion uses a static image and never pins', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('canvas')).not.toBeVisible();
  expect(await page.locator('picture img').evaluate((img: HTMLImageElement) => img.currentSrc)).toContain('frame_0180.webp');
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
});
test('portrait loads and scrolls without page errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/');
  await page.mouse.wheel(0, 100);
  await expect(page.locator('[data-ready=true]')).toBeVisible({ timeout: 20000 });
  await expect(page.locator('.pin-spacer')).toHaveCount(1);
  await page.evaluate(() => window.scrollTo(0, innerHeight * 3));
  await expect(page.locator('[data-cut=true]')).toHaveCount(1, { timeout: 10000 });
  expect(errors).toEqual([]);
});
test('lab experiments respond to keyboard and buttons', async ({ page }) => {
  await page.goto('/lab');
  const slider = page.getByRole('slider');
  await slider.focus(); await page.keyboard.press('ArrowRight');
  await expect(slider).toHaveValue('3');
  await page.getByRole('button', { name: 'Reveal type' }).click();
  await expect(page.locator('.type-stage .revealed')).toHaveCount(1);
  await page.getByRole('button', { name: 'Reset type' }).click();
  await expect(page.locator('.type-stage .revealed')).toHaveCount(0);
});
test('all navigation destinations and error route work', async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [name, path] of [['Work', '/work'], ['About', '/about'], ['Lab', '/lab'], ['Writing', '/writing'], ["Let's talk", '/contact']]) {
    await page.goto('/');
    if (info.project.name === 'mobile') await page.getByRole('button', { name: 'Open navigation' }).click();
    const nav = page.getByRole('navigation', { name: info.project.name === 'mobile' ? 'Mobile navigation' : 'Main navigation' });
    await nav.getByRole('link', { name, exact: name !== "Let's talk" }).click();
    await expect(page).toHaveURL(path);
  }
  const response = await page.goto('/not-a-page'); expect(response?.status()).toBe(404);
  await page.getByRole('link', { name: /Back home/ }).click(); await expect(page).toHaveURL('/');
});
