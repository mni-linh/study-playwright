# 📘 Reporters trong Playwright

Playwright hỗ trợ nhiều loại reporters để hiển thị kết quả test một cách dễ hiểu và phục vụ CI/CD.

## 🧾 Các loại Reporters có sẵn

| Reporter            | Mô tả                                             |
| ------------------- | ------------------------------------------------- |
| `list`              | In ra kết quả test theo dạng danh sách (mặc định) |
| `line`              | Hiển thị tiến trình test ngắn gọn theo dòng       |
| `dot`               | In mỗi test là một dấu chấm                       |
| `json`              | Xuất báo cáo ở định dạng JSON                     |
| `junit`             | Phù hợp với CI như Jenkins                        |
| `html`              | Báo cáo trực quan bằng giao diện web              |
| `allure-playwright` | Báo cáo đẹp & mạnh mẽ (cần cài thêm gói)          |

## 🔧 Cấu hình Reporters trong `playwright.config.ts`

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  reporter: [
    ["list"], // Dạng danh sách
    ["html", { outputFolder: "playwright-report", open: "never" }], // HTML
    ["junit", { outputFile: "results.xml" }], // JUnit cho CI
  ],
});
```

🔸 `open: 'never'` nghĩa là không tự mở trình duyệt sau khi test xong.

## 🚀 Chạy test và mở HTML Report

```ts
npx playwright test
npx playwright show-report
```

## 📦 Cài Allure Report (Tuỳ chọn nâng cao)

```ts
npm install -D allure-playwright
```

Cập nhật `playwright.config.ts`:

```ts
reporter: [['allure-playwright']],
```

Tạo Allure báo cáo:

```ts
npx playwright test
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

## 🛠 Tạo Custom Reporter

Tạo file `my-reporter.ts`:

```ts
import type { Reporter, TestCase, TestResult } from "@playwright/test/reporter";

class MyReporter implements Reporter {
  onTestEnd(test: TestCase, result: TestResult) {
    console.log(`✅ ${test.title} - ${result.status}`);
  }
}

export default MyReporter;
```

Trong `playwright.config.ts`:

```
reporter: [['./my-reporter.ts']],
```

## ✅ Kết luận

- Dùng html khi muốn báo cáo trực quan.

- Dùng junit khi tích hợp Jenkins/GitLab.

- Có thể kết hợp nhiều reporter một lúc.

- Tạo custom reporter để điều chỉnh output theo ý bạn.
