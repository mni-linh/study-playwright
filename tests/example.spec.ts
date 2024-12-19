/* test: Được dùng để định nghĩa các bài kiểm thử (test case).
   expect: Được dùng để thực hiện các khẳng định (assertions) nhằm kiểm tra trạng thái hoặc hành vi của ứng dụng trong bài kiểm thử.
 */
import { test, expect } from "@playwright/test";

// test("Tra cứu các phần tử có vai trò link", async ({ page }) => {
//   await page.goto("https://playwright.dev/");

//   // Tìm tất cả phần tử có vai trò link
//   const links = await page.locator("role=link").all();

//   // Lấy tên của từng phần tử (dựa trên văn bản hoặc aria-label)
//   for (const link of links) {
//     const text = await link.textContent();
//     console.log("Link text:", text);
//   }
// });

// Test đầu tiên: Kiểm tra tiêu đề (title) của trang
test("has title", async ({ page }) => {
  // Định nghĩa một bài kiểm thử với tên là "has title". Hàm async sử dụng đối tượng page để tương tác với trình duyệt.
  await page.goto("https://playwright.dev/"); // Điều hướng trình duyệt đến URL https://playwright.dev/.

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/); // Xác minh rằng tiêu đề (title) của trang chứa chuỗi "Playwright". (Đây là một biểu thức chính quy (regular expression), kiểm tra xem tiêu đề có chứa từ "Playwright" hay không.)
});

// Test thứ hai: Kiểm tra liên kết "Get started"
test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click(); //  Tìm một phần tử HTML có vai trò là liên kết (role: "link") và có thuộc tính name là "Get started". Và .click() là  thực hiện hành động nhấp chuột vào liên kết này.

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" }) // Tìm một phần tử HTML có vai trò là tiêu đề (role: "heading") và có thuộc tính name là "Installation". Và toBeVisible là  Kiểm tra xem tiêu đề này có hiển thị trên trang hay không.
  ).toBeVisible();
});
