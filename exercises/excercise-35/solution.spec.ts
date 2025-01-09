/* TYPESCRIPT */

function calculateMagicGate(calculations: string[]): number[] {
  return calculations.map((calculation) => {
    const result = eval(calculation.replace(/\s+/g, ""));
    return Math.floor(result);
  });
}

console.log(calculateMagicGate(["1 + 1", "200*2", "3 - 10"]));
console.log(calculateMagicGate(["10/3", "5+5", "100 - 1"]));
console.log(calculateMagicGate(["20*5", "10/2", "15-5"]));
