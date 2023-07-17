// マニングの粗度係数
export type ManningRoughnessCoefficient = {
  name: string;
  value: number | '';
};

export const manningRoughnessCoefficients: ManningRoughnessCoefficient[] = [
  {
    name: '直接入力',
    value: '',
  },
  // 社団法人 日本道路協会 道路土工－排水工指針 22ページ
  {
    name: '現場打ちコンクリート',
    value: 0.015,
  },
  {
    name: 'コンクリート管',
    value: 0.013,
  },
  {
    name: 'コルゲートメタル管（1形）',
    value: 0.024,
  },
  {
    name: 'コルゲートメタル管（2形）',
    value: 0.033,
  },
  {
    name: 'コルゲートメタル管（ベーリングあり）',
    value: 0.012,
  },
  {
    name: '塩化ビニル管',
    value: 0.01,
  },
  {
    name: 'コンクリート2次製品',
    value: 0.013,
  },
  {
    name: '鋼, 塗装なし, 平滑',
    value: 0.012,
  },
  {
    name: 'モルタル',
    value: 0.013,
  },
];

/**
 * マニングの平均流速を計算する
 * @param roughnessCoefficient マニングの粗度係数
 * @param r 径深
 * @param i 水路勾配
 * @returns マニングの平均流速
 */
export const calcManningAverageVelocity = (
  roughnessCoefficient: number,
  r: number,
  i: number,
) => {
  return (1 / roughnessCoefficient) * Math.pow(r, 2 / 3) * Math.pow(i, 1 / 2);
};

/**
 * マニングの平均流速から流量を計算する
 * @param roughnessCoefficient マニングの粗度係数
 * @param r 径深
 * @param i 水路勾配
 * @param a 流水断面積（流積）
 * @returns マニングの流量
 */
export const calcManningFlowVolume = (
  roughnessCoefficient: number,
  r: number,
  i: number,
  a: number,
) => {
  return a * calcManningAverageVelocity(roughnessCoefficient, r, i);
};
