import sharp from 'sharp';
const pixels = Buffer.alloc(128 * 128 * 4);
let seed = 17;
for (let i = 0; i < pixels.length; i += 4) {
  seed = (seed * 16807) % 2147483647;
  pixels[i] = pixels[i + 1] = pixels[i + 2] = seed % 256;
  pixels[i + 3] = 255;
}
await sharp(pixels, { raw: { width: 128, height: 128, channels: 4 } }).png().toFile('public/grain.png');
