/* JAVASCRIPT */

function calculateCompoundInterest(principal, rate, days, n = 365) {
  const rateDecimal = rate / 100;

  const t = days / n;

  const A = principal * Math.pow(1 + rateDecimal / n, n * t);

  const roundedA = A.toFixed(2);

  return `Số tiền sau ${days} ngày là: ${roundedA}`;
}

console.log(calculateCompoundInterest(1000, 5, 30));
console.log(calculateCompoundInterest(2000, 3.5, 60));
