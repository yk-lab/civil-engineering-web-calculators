import {
  calcManningAverageVelocity,
  calcManningFlowVolume,
} from 'utils/manning_formula';

describe('calcManningAverageVelocity: マニングの平均流速を計算する', () => {
  describe.each<[number, number, number, number]>([
    [0.013, 0.0854, 10 / 1000, 1.492],
    [0.013, 0.0854, 4 / 1000, 0.943],
    [0.013, 0.0854, 3 / 1000, 0.817],
    [0.013, 0.0854, 2 / 1000, 0.667],
    [0.013, 0.0854, 1 / 1000, 0.472],
    [0.013, 0.1106, 10 / 1000, 1.772],
    [0.013, 0.1106, 4 / 1000, 1.121],
    [0.013, 0.1106, 3 / 1000, 0.971],
    [0.013, 0.1106, 2 / 1000, 0.793],
    [0.013, 0.1106, 1 / 1000, 0.56],
  ])('calcManningAverageVelocity', (n, r, i, expected) => {
    test(`calcManningAverageVelocity(${n}, ${r}, ${i}) = ${expected}`, () => {
      expect(calcManningAverageVelocity(n, r, i)).toBeCloseTo(expected);
    });
  });
});

describe('calcManningFlowVolume: マニングの平均流速から流量を計算する', () => {
  describe.each<[number, number, number, number, number]>([
    [0.013, 0.0854, 10 / 1000, 0.0521, 0.0777],
    [0.013, 0.0854, 4 / 1000, 0.0521, 0.0491],
    [0.013, 0.0854, 3 / 1000, 0.0521, 0.0426],
    [0.013, 0.0854, 2 / 1000, 0.0521, 0.0348],
    [0.013, 0.0854, 1 / 1000, 0.0521, 0.0246],
    [0.013, 0.1106, 10 / 1000, 0.0941, 0.1667],
    [0.013, 0.1106, 4 / 1000, 0.0941, 0.1055],
    [0.013, 0.1106, 3 / 1000, 0.0941, 0.0914],
    [0.013, 0.1106, 2 / 1000, 0.0941, 0.0746],
    [0.013, 0.1106, 1 / 1000, 0.0941, 0.0527],
  ])('calcManningFlowVolume', (n, r, i, a, expected) => {
    test(`calcManningFlowVolume(${n}, ${r}, ${i}, ${a}) = ${expected}`, () => {
      expect(calcManningFlowVolume(n, r, i, a)).toBeCloseTo(expected);
    });
  });
});
