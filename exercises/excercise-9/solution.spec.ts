/* JAVASCRIPT */
function sumArray(arr) {
  // Check if array is empty
  if (arr.length === 0) {
    return "Mảng rỗng";
  }

  // Calculate the sum of numeric elements
  const sum = arr.reduce((total, current) => {
    return typeof current === "number" ? total + current : total;
  }, 0);

  return `Tổng là: ${sum}`;
}

const input1 = [1, 2, 3, 4, 5];
console.log(sumArray(input1));

const input2 = [1, "abc", 3, 4, "xyz", 5];
console.log(sumArray(input2));

const input3 = [];
console.log(sumArray(input3));

/* PLAYWRIGHT*/
import { expect, test } from "@playwright/test";
import { randomInt } from "crypto";

test("problem 9", async ({ request }) => {
  // Step 1: Generate a random username
  let username = `linh${randomInt(1, 1000)}`;
  console.log("Generated username:", username);

  // Step 2: Send a POST request to create a new user
  const response = await request.post("https://demoqa.com/Account/v1/User", {
    data: {
      userName: username,
      password: "Abc@12345",
    },
  });

  // Step 3: Parse and log the response body
  const bodyJson = await response.json();
  console.log("Response body:", bodyJson);

  // Step 4: Verify the response status code
  expect(response.status()).toEqual(201);

  // Step 5: Verify the username in the response matches the input username
  expect(bodyJson.username).toEqual(username);
});
