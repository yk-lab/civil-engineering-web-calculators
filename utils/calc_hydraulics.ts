// n割水深の値を計算する
export const calcNDepth = (n: number, depth: number) => {
  // n: 0割 ~ 10割
  return depth * (0.1 * n);
};

// 中心角を計算する
export const calcCentralAngle = (height: number, diameter: number) => {
  // 中心角 = 2 * arccos(1 - 水深 / 半径)
  return 2 * Math.acos(1 - height / (diameter / 2));
};

/**
 * 円形断面のときの水面幅を計算する
 * @param diameter 円形断面の直径
 * @param radian 中心角
 * @returns 円形断面の水面幅
 */
export const calcCircularWaterWidth = (diameter: number, radian: number) => {
  // 円形断面の水面幅 = 半径 * sin(中心角 / 2)
  return diameter * Math.sin(radian / 2);
};

/**
 * 円形断面のときの潤辺を計算する
 * @param diameter 円形断面の直径
 * @param radian 中心角
 * @returns 円形断面の潤辺
 */
export const calcCircularWettedPerimeter = (
  diameter: number,
  radian: number,
) => {
  // 円形断面の潤辺 = 半径 * 中心角 / 2
  return (diameter * radian) / 2;
};

/**
 * 円形断面のときの流水断面積を計算する
 * @param diameter 円形断面の直径
 * @param radian 中心角
 * @returns 円形断面の流水断面積（流積）
 */
export const calcCircularFlowArea = (diameter: number, radian: number) => {
  // 円形断面の流水断面積 = (半径^2 / 8) * (中心角 - sin(中心角))
  return (Math.pow(diameter, 2) / 8) * (radian - Math.sin(radian));
};

/**
 * 円形断面のときの径深を計算する
 * @param diameter 円形断面の直径
 * @param radian 中心角
 * @returns 円形断面の径深
 */
export const calcCircularDepth = (diameter: number, radian: number) => {
  // 円形断面の径深 = (半径 / 4) * (1 - sin(中心角) / 中心角)
  return (diameter * (1 - Math.sin(radian) / radian)) / 4;
};
