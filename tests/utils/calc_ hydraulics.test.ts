import { calcNDepth } from 'utils/calc_ hydraulics';

describe('calcNDepth: n割水深', () => {
  test('8割水深', () => {
    expect(calcNDepth(8, 100)).toBe(80);
    expect(calcNDepth(8, 10)).toBe(8);
    expect(calcNDepth(8, 1)).toBe(0.8);
    expect(calcNDepth(8, 0)).toBe(0);
  });
  test('10割水深', () => {
    expect(calcNDepth(10, 100)).toBe(100);
    expect(calcNDepth(10, 10)).toBe(10);
    expect(calcNDepth(10, 1)).toBe(1);
    expect(calcNDepth(10, 0)).toBe(0);
  });
  test('0割水深', () => {
    expect(calcNDepth(0, 100)).toBe(0);
    expect(calcNDepth(0, 10)).toBe(0);
    expect(calcNDepth(0, 1)).toBe(0);
    expect(calcNDepth(0, 0)).toBe(0);
  });
});
