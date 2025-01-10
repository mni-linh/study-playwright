/* TYPESCRIPT */

type Player = {
  name: string;
  rank: string;
  chips: number;
};

function calculatePokerScore(
  players: Player[]
): { name: string; score: number }[] {
  const rankScores: Record<string, number> = {
    "Royal Flush": 1000,
    "Straight Flush": 750,
    "Four of a Kind": 500,
    "Full House": 400,
    Flush: 300,
    Straight: 200,
    "Three of a Kind": 150,
    "Two Pair": 100,
    "One Pair": 50,
    "High Card": 10,
  };

  const scores = players.map((player) => {
    const rankScore = rankScores[player.rank] || 0;
    const totalScore = rankScore + player.chips * 10;
    return { name: player.name, score: totalScore };
  });

  scores.sort((a, b) => b.score - a.score);

  return scores;
}

// Test case 1
const players1: Player[] = [
  { name: "Alice", rank: "Full House", chips: 20 },
  { name: "Bob", rank: "Flush", chips: 30 },
  { name: "Charlie", rank: "High Card", chips: 100 },
];

console.log(calculatePokerScore(players1));

// Test case 2
const players2: Player[] = [
  { name: "David", rank: "Royal Flush", chips: 5 },
  { name: "Emma", rank: "Straight Flush", chips: 10 },
  { name: "Frank", rank: "One Pair", chips: 50 },
];

console.log(calculatePokerScore(players2));

// Test case 3
const players3: Player[] = [
  { name: "George", rank: "Four of a Kind", chips: 15 },
  { name: "Hannah", rank: "Three of a Kind", chips: 25 },
  { name: "Ian", rank: "Straight", chips: 8 },
];

console.log(calculatePokerScore(players3));
