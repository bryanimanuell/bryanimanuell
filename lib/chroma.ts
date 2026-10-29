/** Green dominance isolates the backdrop without making dark hair translucent. */
export function keyPixel(r: number, g: number, b: number, alpha = 255) {
  const dominance = g - Math.max(r, b);
  const coverage = 1 - Math.max(0, Math.min(1, (dominance - 12) / 58));
  const matte = Math.max(0, Math.min(1, (coverage - 0.18) / 0.64));
  const despilledGreen = dominance > 8 ? Math.min(g, Math.max(r, b) + 6) : g;
  const sourceMatte = Math.max(0, Math.min(1, (alpha / 255 - .35) / .3));
  return [r, despilledGreen, b, Math.round(255 * sourceMatte * matte)] as const;
}
