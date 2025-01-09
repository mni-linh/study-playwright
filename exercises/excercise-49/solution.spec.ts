/* TYPESCRIPT */

type Vuon = number[][];
type ToaDo = [number, number];

function timDuongHaiTao(
  vuon: Vuon,
  nangLuong: number
): { soTao: number; duongDi: ToaDo[] } {
  const rows = vuon.length;
  const cols = vuon[0].length;

  const directions: ToaDo[] = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  let maxTao = 0;
  let bestPath: ToaDo[] = [];

  function dfs(
    x: number,
    y: number,
    remainingEnergy: number,
    path: ToaDo[],
    apples: number
  ) {
    if (x < 0 || y < 0 || x >= rows || y >= cols || remainingEnergy < 0) {
      return;
    }

    if (vuon[x][y] === 2) {
      apples++;
    }

    if (x === rows - 1 && y === cols - 1) {
      if (apples > maxTao) {
        maxTao = apples;
        bestPath = [...path, [x, y]];
      }
      return;
    }

    path.push([x, y]);

    for (let [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      const energyCost = Math.abs(dx) + Math.abs(dy);
      dfs(nx, ny, remainingEnergy - energyCost, path, apples);
    }

    path.pop();
  }

  dfs(0, 0, nangLuong, [], 0);

  return { soTao: maxTao, duongDi: bestPath };
}
// Testcase 1: Khu vườn với nhiều nhánh và táo.
const vuon = [
  [1, 0, 0, 2],
  [0, 1, 0, 0],
  [0, 0, 1, 2],
  [0, 0, 0, 1],
];

console.log(timDuongHaiTao(vuon, 5));

// Testcase 2: Khu vườn nhỏ hơn với ít năng lượng hơn.
const vuon2 = [
  [1, 2, 0],
  [0, 1, 2],
  [2, 0, 1],
];

console.log(timDuongHaiTao(vuon2, 2));
// Output: { soTao: 1, duongDi: [[0,0], [0,1]] }
