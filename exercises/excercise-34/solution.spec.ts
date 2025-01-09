/* TYPESCRIPT */

type Candy = {
  type: string;
  quantity: number;
};

type TrickOrTreater = {
  name: string;
  candies: Candy[];
};

function findTopTrickOrTreater(trickOrTreaters: TrickOrTreater[]): string {
  let maxCandies = 0;
  let topTrickOrTreater = "";

  for (const trickOrTreater of trickOrTreaters) {
    const totalCandies = trickOrTreater.candies.reduce(
      (sum, candy) => sum + candy.quantity,
      0
    );
    if (totalCandies > maxCandies) {
      maxCandies = totalCandies;
      topTrickOrTreater = trickOrTreater.name;
    }
  }

  return topTrickOrTreater;
}

const trickOrTreaters: TrickOrTreater[] = [
  {
    name: "John",
    candies: [
      { type: "Chocolate", quantity: 10 },
      { type: "Gummy Bears", quantity: 15 },
    ],
  },
  {
    name: "Emma",
    candies: [
      { type: "Lollipop", quantity: 12 },
      { type: "Chocolate", quantity: 8 },
    ],
  },
  {
    name: "Sophia",
    candies: [
      { type: "Gummy Bears", quantity: 20 },
      { type: "Chocolate", quantity: 5 },
    ],
  },
];

const topTrickOrTreater = findTopTrickOrTreater(trickOrTreaters);
console.log(topTrickOrTreater);
