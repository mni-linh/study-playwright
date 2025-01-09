/* TYPESCRIPT */

function decodeVault(numbers: number[]): number[] {
  return numbers.map((num) => {
    let reversed = parseInt(num.toString().split("").reverse().join(""));

    return num + reversed;
  });
}

console.log(decodeVault([123, 456, 789]));
console.log(decodeVault([100, 200, 1000]));
console.log(decodeVault([5, 10, 99]));
