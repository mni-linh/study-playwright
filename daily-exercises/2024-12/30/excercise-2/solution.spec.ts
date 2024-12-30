/* Playwright */
import { test, expect } from "@playwright/test";

test("2024-12-30 _ 2", async ({ page }) => {
  await page.goto("https://material.playwrightvn.com/");
  await page
    .getByRole("link", { name: "Bài học 1: Register Page (có đủ các element)" })
    .click();

  await expect(page).toHaveURL(
    "https://material.playwrightvn.com/01-xpath-register-page.html"
  );

  const infoUser = {
    username: "mni-linh",
    email: "tranthitulinh1305@gmail.com",
    interests: ["music", "art", "technology"],
    country: "Canada",
    dob: "11282000",
    biography: "I'm from BRVT",
    rating: 3,
  };

  await page.locator("#username").fill(infoUser.username);
  await page.locator("#email").fill(infoUser.email);
  await page.getByLabel("Female").check();
  await page.getByLabel("Traveling").check();
  await page.locator("#interests").selectOption(infoUser.interests);
  await page.locator("#country").selectOption(infoUser.country);

  // Format ngày và điền vào input
  const formattedDate = `${infoUser.dob.slice(4)}-${infoUser.dob.slice(
    0,
    2
  )}-${infoUser.dob.slice(2, 4)}`;
  await page.locator("#dob").fill(formattedDate);

  // Sử dụng evaluate với giá trị trực tiếp
  await page.locator("#rating").evaluate((slider, value) => {
    slider.value = value; // Đặt giá trị trực tiếp
    slider.dispatchEvent(new Event("input", { bubbles: true })); // Kích hoạt sự kiện 'input'
    slider.dispatchEvent(new Event("change", { bubbles: true })); // Kích hoạt sự kiện 'change'
  }, infoUser.rating);

  await page.locator("#bio").fill(infoUser.biography);
});
