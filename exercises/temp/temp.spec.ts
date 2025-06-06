// tests/login.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../lessons/pages/LoginPage";

test("Successful login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login("tranthitulinh1305@gmail.com", "@Nhamayductai230140");

  await expect(page).toHaveURL("https://github.com/");
});
