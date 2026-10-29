import sharp from 'sharp';
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { keyPixel } from '../lib/chroma';

const source = path.resolve('assets-src/frames');
const names = (await readdir(source)).filter(n => /^frame_\d{4}\.png$/.test(n)).sort();
if (names.length !== 180) throw new Error(`Expected 180 source frames; found ${names.length}`);
const sets = [{ width: 960, directory: '1080', stride: 1 }, { width: 540, directory: '540', stride: 2 }];
const report: Record<string, unknown> = {};
for (const set of sets) {
  const out = path.resolve('public/frames', set.directory);
  await mkdir(out, { recursive: true });
  const selected = names.filter((_, i) => i % set.stride === 0 || i === names.length - 1);
  let total = 0, firstThirty = 0;
  for (let i = 0; i < selected.length; i += 4) {
    await Promise.all(selected.slice(i, i + 4).map(async name => {
      const { data, info } = await sharp(path.join(source, name)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      for (let p = 0; p < data.length; p += 4) {
        const rgba = keyPixel(data[p], data[p + 1], data[p + 2], data[p + 3]);
        data[p + 1] = rgba[1]; data[p + 3] = rgba[3];
      }
      const output = path.join(out, name.replace('.png', '.webp'));
      await sharp(data, { raw: info }).resize({ width: set.width }).webp({ quality: 72, alphaQuality: 90, effort: 5 }).toFile(output);
      const bytes = (await stat(output)).size;
      total += bytes;
      if (Number(name.slice(6, 10)) <= 30) firstThirty += bytes;
    }));
  }
  report[set.directory] = { count: selected.length, width: set.width, bytes: total, firstThirtyBytes: firstThirty };
  console.log(`${set.directory}: ${selected.length} frames, ${(total / 1048576).toFixed(2)} MiB, first 30 ${(firstThirty / 1048576).toFixed(2)} MiB`);
  if (total > (set.width === 960 ? 7 : 3) * 1048576 || firstThirty > 1048576) throw new Error(`Frame budget exceeded: ${set.directory}`);
}
await writeFile('public/frames/manifest.json', JSON.stringify({ frameCount: 180, shadesOnFrame: 150, sets: report }, null, 2));
