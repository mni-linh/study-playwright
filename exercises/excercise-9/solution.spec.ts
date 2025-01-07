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
  let username = `linh${randomInt(1, 1000)}`;
  console.log("username", username);
  const response = await request.post("https://demoqa.com/Account/v1/User", {
    data: {
      userName: username,
      password: "Abc@12345",
    },
  });

  const bodyJson = await response.json();
  console.log("bodyJson", bodyJson);

  expect(response.status()).toEqual(201);
  expect(bodyJson.username).toEqual(username);
});
