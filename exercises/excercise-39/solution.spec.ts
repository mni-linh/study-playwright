/* TYPESCRIPT */

interface StepsAnalysis {
  totalSteps: number; // Tổng số bước trong tuần
  averageSteps: number; // Trung bình mỗi ngày
  bestDay: number; // Số bước cao nhất
  worstDay: number; // Số bước thấp nhất
  daysAboveTarget: number; // Số ngày đạt mục tiêu
  streak: number; // Số ngày liên tiếp đạt mục tiêu
}

function analyzeSteps(
  dailySteps: number[],
  target: number = 10000
): StepsAnalysis {
  const totalSteps = dailySteps.reduce((sum, steps) => sum + steps, 0);
  const averageSteps = Math.floor(totalSteps / dailySteps.length);
  const bestDay = Math.max(...dailySteps);
  const worstDay = Math.min(...dailySteps);
  const daysAboveTarget = dailySteps.filter((steps) => steps >= target).length;

  let streak = 0;
  let maxStreak = 0;
  for (let steps of dailySteps) {
    if (steps >= target) {
      streak++;
      maxStreak = Math.max(maxStreak, streak);
    } else {
      streak = 0;
    }
  }

  return {
    totalSteps,
    averageSteps,
    bestDay,
    worstDay,
    daysAboveTarget,
    streak: maxStreak,
  };
}

// Test cases
const steps1 = [12000, 11000, 9000, 8000, 10500, 7000, 11500];
console.log(analyzeSteps(steps1));
// Expected output:
// {
//   totalSteps: 69000,
//   averageSteps: 9857,
//   bestDay: 12000,
//   worstDay: 7000,
//   daysAboveTarget: 4,
//   streak: 2
// }

const steps2 = [5000, 6000, 7000, 5500, 4000, 3000, 2000];
console.log(analyzeSteps(steps2));
// Expected output:
// {
//   totalSteps: 32500,
//   averageSteps: 4642,
//   bestDay: 7000,
//   worstDay: 2000,
//   daysAboveTarget: 0,
//   streak: 0
// }

const steps3 = [10000, 10000, 10000, 10000, 10000, 10000, 10000];
console.log(analyzeSteps(steps3));
// Expected output:
// {
//   totalSteps: 70000,
//   averageSteps: 10000,
//   bestDay: 10000,
//   worstDay: 10000,
//   daysAboveTarget: 7,
//   streak: 7
// }
