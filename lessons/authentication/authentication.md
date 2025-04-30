# Xử lý Authentication (`storageState`) trong Playwright

Playwright cho phép bạn lưu và sử dụng lại phiên đăng nhập (authentication state) thông qua `storageState`. Điều này cực kỳ hữu ích khi bạn muốn tránh phải đăng nhập lại mỗi lần chạy test.

## ✅ Các bước thực hiện

### 1. Tạo storageState sau khi đăng nhập vào GitHub

```ts
// login.setup.ts
import { test, expect } from "@playwright/test";

test("Login to GitHub and save storageState", async ({ page }) => {
  await page.goto("https://github.com/login");

  await page.fill("#login_field", "your-username"); // thay bằng user thật
  await page.fill("#password", "your-password"); // thay bằng password thật

  await page.click('input[type="submit"]');
  await page.waitForURL("https://github.com/"); // chờ tới trang chính

  // Lưu trạng thái đăng nhập vào file
  await page.context().storageState({ path: "github-auth.json" });
});
```

✅ Lưu ý: GitHub có thể yêu cầu xác thực 2 bước (2FA). Trường hợp đó nên dùng access token hoặc fake auth để test.

### 2. Dùng storageState để truy cập GitHub mà không cần login lại

```ts
import { test, expect } from "@playwright/test";

test.use({ storageState: "github-auth.json" });

test("Access GitHub using saved login session", async ({ page }) => {
  await page.goto("https://github.com/");

  // Kiểm tra đã đăng nhập chưa
  const avatar = page.locator('summary[aria-label="View profile and more"]');

  // Chờ cho phần tử trở nên visible
  await avatar.waitFor({ state: "visible" });

  // Kiểm tra xem avatar có hiển thị hay không
  await expect(avatar).toBeVisible();

  // Truy cập profile
  await avatar.click();
  await page.getByRole("menuitem", { name: "Your profile" }).click();

  // Kiểm tra profile
  await expect(page).toHaveURL(/github\.com\/mni-linh/);
});
```

### 📂 Tùy chọn cấu hình vào playwright.config.ts

```ts
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    storageState: "github-auth.json",
  },
});
```
