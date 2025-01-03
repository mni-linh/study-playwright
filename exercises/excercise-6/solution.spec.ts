/* JAVASCRIPT */
function findLargestNumber(array) {
  if (array.length === 0) {
    return "Mảng rỗng";
  }

  let largest = array[0]; 
  for (let i = 1; i < array.length; i++) {
    if (array[i] > largest) {
      largest = array[i]; 
    }
  }
  return `Số lớn nhất là: ${largest}`;
}

const array = [3, 7, 2, 5, 9];
console.log(findLargestNumber(array)); 

const emptyArray = [];
console.log(findLargestNumber(emptyArray)); 

/* PLAYWRIGHT*/
