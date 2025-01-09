/* TYPESCRIPT */

function caesarCipher(messages: string[], shift: number): string[] {
  return messages.map((message) => {
    return message
      .split("")
      .map((char) => {
        if (/[a-zA-Z]/.test(char)) {
          let code = char.charCodeAt(0);

          if (char >= "a" && char <= "z") {
            code = ((((code - 97 + shift) % 26) + 26) % 26) + 97;
          } else if (char >= "A" && char <= "Z") {
            code = ((((code - 65 + shift) % 26) + 26) % 26) + 65;
          }

          return String.fromCharCode(code);
        }
        return char;
      })
      .join("");
  });
}

// Test cases
console.log(caesarCipher(["Hello World!", "CAESAR"], 3));
console.log(caesarCipher(["abc", "xyz"], 1));
console.log(caesarCipher(["Happy coding!"], 3));
console.log(caesarCipher(["HELLO"], -1));
console.log(caesarCipher(["test"], 27));
console.log(caesarCipher(["Hello, World 123!"], 1));

function caesarDecipher(messages: string[], shift: number): string[] {
  return caesarCipher(messages, -shift);
}
