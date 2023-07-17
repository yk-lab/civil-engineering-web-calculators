import {
  calcNDepth,
  calcCentralAngle,
  // calcCircularFlowArea,
  // calcCircularWettedPerimeter,
  // calcCircularWaterWidth,
  // calcCircularDepth,
} from 'utils/calc_hydraulics';

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

describe('calcCentralAngle: 中心角', () => {
  describe.each<[number, number, number]>([
    [1, 1, 6.28319],
    [1, 2, 3.14159],
    [80, 100, 4.42859],
    [0, 1, 0],
  ])('calcCentralAngle', (h, d, expected) => {
    test(`calcCentralAngle(${h}, ${d}) = ${expected}`, () => {
      expect(calcCentralAngle(h, d)).toBeCloseTo(expected);
    });
  });
});

describe.todo('calcCircularWaterWidth: 円形断面の水面幅');
describe.todo('calcCircularWettedPerimeter: 円形断面の潤辺');
describe.todo('calcCircularFlowArea: 円形断面の流水断面積');
describe.todo('calcCircularDepth: 円形断面の径深');
