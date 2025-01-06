/* JAVASCRIPT */
function calculateAge(birthYear) {
  const currentYear = new Date().getFullYear();

  if (birthYear > currentYear) {
    console.log("Năm sinh không hợp lệ");
  } else {
    const age = currentYear - birthYear;
    console.log(`Tuổi của bạn là: ${age}`);
  }
}

calculateAge(1990);
calculateAge(2025);

/* PLAYWRIGHT*/
import { test, expect } from "@playwright/test";

test("problem 4", async ({ page }) => {
  // Test Case 1: Navigate to the website and go to the todo page
  await test.step("Navigate to the website: https://material.playwrightvn.com/ and go to the todo page", async () => {
    // Step 1: Open the website
    await page.goto("https://material.playwrightvn.com/");

    // Step 2: Click on the todo page link
    await page.getByRole("link", { name: "Bài học 3: Todo page" }).click();

    // Step 3: Verify the URL
    await expect(page).toHaveURL(
      "https://material.playwrightvn.com/03-xpath-todo-list.html"
    );
  });

  // Test Case 2: Add one todo item
  await test.step("Add one todo", async () => {
    // Step 1: Enter a task into the input field
    await page.getByPlaceholder("Enter a new task").fill("Làm bài tập 4");

    // Step 2: Click the Add Task button
    await page.getByRole("button", { name: "Add Task" }).click();

    // Step 3: Verify the task appears in the list
    await expect(page.getByRole("listitem")).toHaveCount(1);
  });

  // Test Case 3: Edit the added todo item
  await test.step("Edit todo", async () => {
    // Step 1: Register for the dialog event before clicking Edit
    page.once("dialog", async (dialog) => {
      await dialog.accept("Cố gắng hoàn thành bài test của edit todo");
    });

    // Step 2: Click the Edit button
    await page.getByRole("button", { name: "Edit" }).first().click();

    // Step 3: Verify the dialog text is visible after editing
    await expect(
      page.getByText("Cố gắng hoàn thành bài test của edit todo")
    ).toBeVisible();
  });

  // Test Case 4: Delete the todo item
  await test.step("Delete one todo", async () => {
    // Step 1: Click the Delete button
    page.once("dialog", async (dialog) => {
      await dialog.accept("OK");
    });
    await page.getByRole("button", { name: "Delete" }).click();

    // Step 2: Verify the list is empty
    await expect(
      page.getByText("Cố gắng hoàn thành bài test của edit todo")
    ).not.toBeVisible();
  });
});
