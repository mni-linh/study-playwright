/* JAVASCRIPT */
function countWords(inputString) {
  // Removes leading and trailing whitespace from a string
  const trimmedString = inputString.trim();

  // Check if string is empty after removing spaces
  if (trimmedString === "") {
    return 0;
  }

  // Use split to split the string based on whitespace and count the number of elements
  const words = trimmedString.split(/\s+/); // \s+ to handle multiple contiguous spaces
  return words.length;
}

const input1 = "Xin chào, tôi là lập trình viên.";
console.log(`Số từ: ${countWords(input1)}`);

const input2 = "JavaScript rất thú vị!";
console.log(`Số từ: ${countWords(input2)}`); 

const input3 = "      ";
console.log(`Số từ: ${countWords(input3)}`);

/* PLAYWRIGHT*/
