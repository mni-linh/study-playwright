# 📘 Chạy Parallel Tests trong Playwright

Playwright hỗ trợ chạy song song (parallel) các bài test để tăng tốc độ thực thi, đặc biệt hữu ích khi bạn có nhiều bài test cần chạy độc lập.

## 🧠 Lý thuyết

- Mỗi file test được chạy trong một worker (tiến trình con).

- Các `test.describe` trong cùng file không chạy song song, nhưng các file test khác nhau sẽ chạy song song nếu cấu hình đúng.

- Số lượng worker mặc định = số lõi CPU.

## ⚙️ Cấu hình Parallel

File `playwright.config.ts`:

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  workers: 4, // số lượng test chạy song song (tùy theo máy)
  use: {
    headless: true,
  },
});
```

Bạn có thể tạm ghi đè khi chạy:

```ts
npx playwright test --workers=2
```

## 🧪 Ví dụ test chạy song song

Tạo 2 file test riêng biệt:

`tests/google.spec.ts`

```ts
import { test, expect } from "@playwright/test";

test("Google search", async ({ page }) => {
  await page.goto("https://www.google.com/");
  await page.fill('input[name="q"]', "Playwright");
  await page.keyboard.press("Enter");
  await expect(page).toHaveTitle(/Playwright/);
});
```

`tests/github.spec.ts`

```ts
import { test, expect } from "@playwright/test";

test("GitHub home page", async ({ page }) => {
  await page.goto("https://github.com");
  await expect(page).toHaveTitle(/GitHub/);
});
```

Chạy

```ts
npx playwright test
```

Bạn sẽ thấy cả 2 file chạy cùng lúc nếu máy hỗ trợ.

## ✅ Lưu ý

- Tránh chia sẻ state giữa các test khi chạy song song.

- Tránh dùng chung file ghi log hoặc dữ liệu tạm.

- Dùng `test.describe.configure({ mode: 'serial' })` nếu muốn test trong file chạy tuần tự.

```ts
test.describe.configure({ mode: "serial" }); // chạy tuần tự trong file
```
