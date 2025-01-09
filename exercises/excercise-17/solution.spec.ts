/* JAVASCRIPT */
function findSecondLargest(arr) {
  const uniqueNumbers = [...new Set(arr)];

  if (uniqueNumbers.length < 2) {
    return "Không có số lớn thứ hai";
  }

  uniqueNumbers.sort((a, b) => b - a);

  return `Số lớn thứ hai là: ${uniqueNumbers[1]}`;
}

// Ví dụ sử dụng:
console.log(findSecondLargest([12, 35, 1, 10, 34, 1]));
console.log(findSecondLargest([10, 5, 10]));
console.log(findSecondLargest([5]));
console.log(findSecondLargest([-10, -20, -30, -10]));
console.log(findSecondLargest([1, 1, 1, 1]));
