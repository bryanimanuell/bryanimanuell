export const FRAME_COUNT = 180;
export const SHADES_ON_FRAME = 150;
export const frameUrl = (frame: number, mobile = false) => `/frames/${mobile ? '540' : '1080'}/frame_${String(frame).padStart(4, '0')}.webp`;
export function frameOrder(mobile: boolean, reverse = false) {
  const valid = Array.from({ length: FRAME_COUNT }, (_, i) => i + 1).filter(f => !mobile || f % 2 === 1 || f === FRAME_COUNT);
  const prioritized = [reverse ? FRAME_COUNT : 1, FRAME_COUNT, SHADES_ON_FRAME - (mobile ? 1 : 0), ...valid.filter(f => (f - 1) % 8 === 0), ...valid.filter(f => (f - 1) % 4 === 0), ...valid];
  return [...new Set(prioritized)];
}
