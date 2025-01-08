/* JAVASCRIPT */

function countPrimes(numbers) {
  function isPrime(num) {
    if (num <= 1) return false; 
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false; 
    }
    return true;
  }

  let primeCount = 0;
  for (const num of numbers) {
    if (isPrime(num)) {
      primeCount++;
    }
  }

  return primeCount;
}

const input1 = [2, 3, 4, 5, 6, 7];
console.log("Số lượng số nguyên tố:", countPrimes(input1)); // Output: 4

const input2 = [10, 15, 20, 25, 30];
console.log("Số lượng số nguyên tố:", countPrimes(input2)); // Output: 0

const input3 = [];
console.log("Số lượng số nguyên tố:", countPrimes(input3)); // Output: 0
