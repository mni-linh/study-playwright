/* JAVASCRIPT */
function replaceEmail(inputString) {
  // Use simpler regular expressions to find emails
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

  // Replace email with 'hidden@example.com'
  return inputString.replace(emailRegex, "hidden@example.com");
}

// Usage example
const input = "Liên hệ với tôi qua email john.doe@example.com hoặc support@mydomain.com";
const output = replaceEmail(input);
console.log(output);

/* PLAYWRIGHT*/
