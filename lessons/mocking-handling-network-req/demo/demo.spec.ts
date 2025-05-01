import { test, expect } from "@playwright/test";
import users from "./users.json"; // chứa JSON bạn gửi

test("should show mocked users list", async ({ page }) => {
  await page.route("**/users", async (route) => {
    // Trả về dữ liệu JSON từ file local
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(users),
    });
  });

  await page.goto(
    "http://127.0.0.1:5500/lessons/mocking-handling-network-req/demo/index.html"
  ); // hoặc URL trang HTML của bạn

  // Kiểm tra hiển thị tên người dùng đầu tiên
  await expect(page.getByText("Linh nè")).toBeVisible();
});
