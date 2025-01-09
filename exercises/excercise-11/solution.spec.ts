/* JAVASCRIPT */
function trimSpaces(str) {
  // Removes spaces at the beginning and end of the string, then replaces any extra spaces between words with a single space
  return str.trim().replace(/\s+/g, " ");
}

console.log(trimSpaces("   Đây là   một   ví dụ   "));
console.log(trimSpaces("    JavaScript   là   ngôn ngữ    lập trình   "));
console.log(trimSpaces("   Không có khoảng trắng dư thừa    "));

/* PLAYWRIGHT*/
import { test } from "@playwright/test";

test.beforeEach(async ({ context }) => {
  // Step 1: Grant permissions for geolocation, camera and microphone
  await context.grantPermissions(["geolocation", "camera", "microphone"], {
    origin: "https://material.playwrightvn.com",
  });
});

test("problem 11", async ({ page }) => {
  // Step 2: Open the website
  await page.goto(
    "https://material.playwrightvn.com/017-detect-user-agent.html"
  );
});
