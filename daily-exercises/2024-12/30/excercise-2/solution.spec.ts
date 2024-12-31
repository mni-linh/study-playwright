/* JAVASCRIPT */
function reverseString(input) {
  const characters = input.split("");

  const reversedCharacters = characters.reverse();

  const reversedString = reversedCharacters.join("");

  console.log("Chuỗi đảo ngược:", reversedString);

  return reversedString;
}

reverseString("hello");

/* PLAYWRIGHT*/
import { test, expect } from "@playwright/test";

// Data test
const infoUser = {
  username: "mni-linh",
  email: "tranthitulinh1305@gmail.com",
  gender: "Female",
  hobbies: "Traveling",
  interests: ["Art", "Music", "Technology"],
  country: "Canada",
  dob: "2000-11-28",
  // profilePicture: "daily-exercises/2024-12/30/excercise/images/examp.jpg",
  biography: "I'm from BR-VT",
  rateUs: "3",
  favColor: "#33CC99",
  newsletter: "Subscribe",
  enableFeature: "Enable Feature",
};

test("2024-12-30 _ 2", async ({ page }) => {
  await page.goto("https://material.playwrightvn.com/");
  await page
    .getByRole("link", { name: "Bài học 1: Register Page (có đủ các element)" })
    .click();

  // Fill infomation
  await page.getByLabel("Username").fill(infoUser.username);
  await page.getByLabel("Email").fill(infoUser.email);
  await page.getByLabel(infoUser.gender, { exact: true }).check();
  await page.getByLabel(infoUser.hobbies, { exact: true }).check();
  await page.getByLabel("Interests").selectOption(infoUser.interests);
  await page.getByLabel("Country").selectOption(infoUser.country);
  await page.getByLabel("Date of Birth").fill(infoUser.dob);
  // await page
  //   .getByLabel("Profile Picture")
  //   .setInputFiles(infoUser.profilePicture);
  await page.getByLabel("Biography").fill(infoUser.biography);
  await page.getByLabel("Rate Us").fill(infoUser.rateUs);
  await page.locator("#favcolor").evaluate((element: any, value: string) => {
    element.value = value; // Đặt giá trị mới
    element.dispatchEvent(new Event("input", { bubbles: true })); // Kích hoạt sự kiện 'input'
    element.dispatchEvent(new Event("change", { bubbles: true })); // Kích hoạt sự kiện 'change'
  }, infoUser.favColor);
  await page.getByLabel(infoUser.newsletter).check();
  await page.locator(".switch").click();
  await page.getByLabel(infoUser.enableFeature).check();

  // Submit
  await page.getByRole("button", { name: "Register" }).click();

  // Expect output
  await expect(page).toHaveURL(
    "https://material.playwrightvn.com/01-xpath-register-page.html"
  );
  await expect(page.locator("//tbody//tr")).toHaveCount(1);
  await expect(page.locator("//tbody//td").nth(0)).toHaveText("1");
  await expect(page.locator("//tbody//td").nth(1)).toHaveText(
    infoUser.username
  );
  await expect(page.locator("//tbody//td").nth(2)).toHaveText(infoUser.email);
  await expect(page.locator("//tbody//td").nth(3)).toContainText(
    `Gender: ${infoUser.gender.toLowerCase()}`
  );
  await expect(page.locator("//tbody//td").nth(3)).toContainText(
    `Hobbies: ${infoUser.hobbies.toLowerCase()}`
  );
  await expect(page.locator("//tbody//td").nth(3)).toContainText(
    `Country: ${infoUser.country.toLowerCase()}`
  );
  await expect(page.locator("//tbody//td").nth(3)).toContainText(
    `Date of Birth: ${infoUser.dob}`
  );
  await expect(page.locator("//tbody//td").nth(3)).toContainText(
    `Biography: ${infoUser.biography}`
  );
  await expect(page.locator("//tbody//td").nth(3)).toContainText(
    `Rating: ${infoUser.rateUs}`
  );
  await expect(page.locator("//tbody//td").nth(3)).toContainText(
    `Favorite Color: ${infoUser.favColor.toLowerCase()}`
  );
  // await expect(page.locator("//tbody//td").nth(3)).toContainText(
  //   `Newsletter: ${}`
  // );
  // await expect(page.locator("//tbody//td").nth(3)).toContainText(
  //   "Enable Feature: "
  // );
});
