/* TYPESCRIPT */

function calculateTreasure(sequences: string[]): number[] {
  return sequences.map((seq) => {
    const [a, b] = seq.split("...").map(Number);

    if (a > 0 && b > 0 && a <= b) {
      return Array.from({ length: b - a + 1 }, (_, i) => a + i).reduce(
        (sum, num) => sum + num,
        0
      );
    } else {
      throw new Error("Invalid range");
    }
  });
}

console.log(calculateTreasure(["1...5", "2...6", "10...12"]));
console.log(calculateTreasure(["1...1", "1...3", "1...10"]));
console.log(calculateTreasure(["5...10", "20...22", "1...5"]));
