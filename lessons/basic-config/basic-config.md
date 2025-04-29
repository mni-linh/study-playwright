# Cấu hình cơ bản (`playwright.config.ts`)

Tập tin `playwright.config.ts` cho phép bạn cấu hình các thiết lập cơ bản cho quá trình chạy test trong Playwright.

## Cấu trúc mẫu

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  timeout: 30000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    baseURL: "https://example.com",
  },
  projects: [
    {
      name: "Chromium",
      use: { browserName: "chromium" },
    },
    {
      name: "Firefox",
      use: { browserName: "firefox" },
    },
    {
      name: "WebKit",
      use: { browserName: "webkit" },
    },
  ],
});
```

## Giải thích các tuỳ chọn chính

- `timeout`: thời gian timeout mặc định cho mỗi test (ms).
- `headless`: chạy ở chế độ không giao diện.
- `viewport`: kích thước khung nhìn của trình duyệt.
- `ignoreHTTPSErrors`: bỏ qua lỗi HTTPS.
- `screenshot`: cấu hình chụp ảnh màn hình (`on`, `off`, `only-on-failure`).
- `video`: cấu hình quay video (`on`, `off`, `retain-on-failure`).
- `baseURL`: URL gốc cho các thao tác điều hướng (`page.goto()`).
- `projects`: chạy trên nhiều trình duyệt khác nhau.

## Mẹo sử dụng

- Tạo file `playwright.config.ts` ở thư mục gốc dự án.
- Cấu hình 1 lần, áp dụng cho toàn bộ test suite.
