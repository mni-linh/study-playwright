/* JAVASCRIPT */
function reverseString(str: string) {
  const charStr = str.split("");
  let reversedStr = "";
  for (let i = charStr.length - 1; i >= 0; i--) {
    reversedStr += charStr[i];
  }
  return reversedStr;
}

reverseString("hello"); // "olleh"

/* PLAYWRIGHT */
import { expect, test } from "@playwright/test";

test("problem 2", async ({ page }) => {
  await page.goto("/");

  // Step 1: Navigate to the Register Page
  await page.getByRole("link", { name: "Register" }).click();

  // Step 2: Fill in Registration Details
  // Data test
  const registrationDetails = {
    username: "mni-linh",
    email: "tranthitulinh1305@gmail.com",
    gender: "female",
    hobbies: "traveling",
    interests: "art",
    country: "australia",
    dateOfBirth: "2000-11-28",
    imageProfile: "exercises/exercise-2/images/examp.jpg",
    biography: "I'm Linh",
    rate: "8",
    favColor: "#4caf50",
    newsLetter: "Yes",
    enableFeature: "Yes",
    starRating: 4.2,
    customDate: "",
  };

  const {
    username,
    email,
    gender,
    hobbies,
    interests,
    country,
    dateOfBirth,
    imageProfile,
    biography,
    rate,
    favColor,
    newsLetter,
    enableFeature,
    starRating,
    customDate,
  } = registrationDetails;

  // Fill in the registration form
  await page.locator("#username").fill(username);
  await page.locator("#email").fill(email);
  await page.locator(`#${gender}`).click();
  await page.locator(`#${hobbies}`).click();
  await page.locator("#interests").selectOption(`${interests}`);
  await page.locator("#country").selectOption(`${country}`);
  await page.locator("#dob").fill(dateOfBirth);
  await page.locator("#profile").setInputFiles(imageProfile);
  await page.locator("#bio").fill(biography);
  await page.locator("#rating").fill(rate);
  await page.locator("#favcolor").fill(favColor);
  await page.locator("#newsletter").click();
  await page.locator(".switch").check();

  const percent = starRating / 5;
  const ratingBox = await page.locator("#starRating").boundingBox();

  if (ratingBox) {
    const x = ratingBox.x + ratingBox.width * percent;
    const y = ratingBox.y + ratingBox.height / 2;
    await page.mouse.click(x, y);
  }

  await page.getByRole("button", { name: "Register" }).click();

  // Check URL after registration
  await expect(page).toHaveURL(
    "https://material.playwrightvn.com/01-xpath-register-page.html"
  );

  // Get the count of rows in the table
  const rowCount = await page.locator("//tbody/tr").count();
  // Get the last row in the table
  const lastRow = page.locator("//tbody/tr[last()]");

  // Validate the number of rows in the table
  await expect(lastRow.locator("td").nth(0)).toHaveText(rowCount.toString());
  // Validate the username and email in the last row of the table
  await expect(lastRow.locator("td").nth(1)).toHaveText(username);
  await expect(lastRow.locator("td").nth(2)).toHaveText(email);
  await expect(lastRow.locator("td").nth(3)).toHaveText(
    `Gender: ${gender}
  Hobbies: ${hobbies}
  Country: ${country}
  Date of Birth: ${dateOfBirth}
  Biography: ${biography}
  Rating: ${rate}
  Favorite Color: ${favColor}
  Newsletter: ${newsLetter}
  Enable Feature: ${enableFeature}
  Star Rating: ${starRating}⭐
  Custom Date: ${customDate}`
  );
});
