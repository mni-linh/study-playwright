import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";

test("Successful login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login("invalid_user1", "invalid_pass");

  await expect(page).toHaveURL("https://github.com/");
});
