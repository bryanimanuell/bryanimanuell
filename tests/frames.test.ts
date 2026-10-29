import test from 'node:test';
import assert from 'node:assert/strict';
import { keyPixel } from '../lib/chroma';
import { frameOrder } from '../lib/frames';
test('green backdrop becomes transparent without holes in hair or skin', () => {
  assert.equal(keyPixel(0, 190, 0)[3], 0);
  assert.equal(keyPixel(20, 23, 22)[3], 255);
  assert.equal(keyPixel(180, 150, 125)[3], 255);
  assert.equal(keyPixel(100, 110, 104)[3], 255);
  assert.equal(keyPixel(24, 22, 23, 207)[3], 255);
  assert.equal(keyPixel(100, 100, 100, 20)[3], 0);
});
test('mobile download queue only requests exported frames', () => {
  for (const reverse of [false, true]) {
    const order = frameOrder(true, reverse);
    assert.equal(order.length, 91);
    assert.equal(order[0], reverse ? 180 : 1);
    assert.ok(order.every(f => f % 2 === 1 || f === 180));
  }
  assert.equal(frameOrder(false).length, 180);
});
