/* TYPESCRIPT */

function calculateSurvivors(n: number, eliminations: number[]): number {
  let remainingPlayers = n;

  for (const eliminated of eliminations) {
    if (remainingPlayers <= 0) {
      return 0;
    }
    remainingPlayers -= eliminated;
    if (remainingPlayers < 0) {
      return 0;
    }
  }

  return remainingPlayers;
}

// Test cases
const survivors1 = calculateSurvivors(100, [10, 20, 30, 40]);
console.log(survivors1);

const survivors2 = calculateSurvivors(50, [10, 20, 15]);
console.log(survivors2);

const survivors3 = calculateSurvivors(20, [5, 10, 15]);
console.log(survivors3);

const survivors4 = calculateSurvivors(10, [2, 3, 1, 4]);
console.log(survivors4);
