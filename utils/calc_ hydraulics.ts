// n割水深の値を計算する
export const calcNDepth = (n: number, depth: number) => {
  // n: 0割 ~ 10割
  return depth * (0.1 * n);
};
