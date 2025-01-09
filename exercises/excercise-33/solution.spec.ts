/* TYPESCRIPT */
function calculateTotalDrinks(initialBottles: number): number {
  let totalDrinks = initialBottles;
  let emptyBottles = initialBottles;

  while (emptyBottles >= 3) {
    const newBottles = Math.floor(emptyBottles / 3);
    totalDrinks += newBottles;
    emptyBottles = (emptyBottles % 3) + newBottles;
  }

  return totalDrinks;
}

console.log(calculateTotalDrinks(12));
console.log(calculateTotalDrinks(5));
console.log(calculateTotalDrinks(2));
