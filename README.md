# 👩‍💻 Study Playwright

**Playwright** là một framework **mã nguồn mở** do **Microsoft** phát triển, dùng để **tự động hóa kiểm thử** ứng dụng web. Nó hỗ trợ:

- **Đa trình duyệt**: Chromium, Firefox, WebKit (Safari)
- **Đa nền tảng**: Windows, Linux, macOS
- **Đa ngôn ngữ**: JavaScript, TypeScript, Python, Java, .NET

---

## ⚖️ So sánh Playwright với Selenium và Cypress

| Tiêu chí                    | **Playwright**                | **Selenium**                | **Cypress**             |
| --------------------------- | ----------------------------- | --------------------------- | ----------------------- |
| **Đa trình duyệt**          | ✅ Chromium, Firefox, WebKit  | ✅ Tất cả trình duyệt chính | ❌ Chỉ Chromium-based   |
| **Đa tab / cửa sổ**         | ✅ Hỗ trợ tốt                 | ✅ Có                       | ❌ Hạn chế              |
| **Tốc độ**                  | ⚡ Nhanh (protocol thấp)      | 🐢 Phụ thuộc WebDriver      | ⚡ Nhanh nhưng giới hạn |
| **Tự động chờ (auto-wait)** | ✅ Có sẵn                     | ❌ Phải xử lý thủ công      | ✅ Có                   |
| **Chạy song song**          | ✅ Dễ thiết lập               | 🔁 Phức tạp hơn             | ❌ Hạn chế              |
| **Kiểm thử API**            | ✅ Có tích hợp                | ❌ Phải dùng công cụ ngoài  | ✅ Có                   |
| **Headless mode**           | ✅ Có                         | ✅ Có                       | ✅ Có                   |
| **Mobile emulation**        | ✅ Có                         | 🔁 Phức tạp                 | 🔁 Giới hạn             |
| **Screenshot / Video**      | ✅ Tích hợp sẵn               | ✅ Có                       | ✅ Có                   |
| **Hỗ trợ ngôn ngữ**         | ✅ JS, TS, Python, Java, .NET | ✅ Rất đa dạng              | ❌ Chỉ JS/TS            |

---

## ✅ Ưu điểm nổi bật của Playwright

- **Hỗ trợ đa trình duyệt thật sự**, bao gồm WebKit (Safari)
- **Tự động chờ** khi element sẵn sàng, tránh flaky test
- **Hỗ trợ đa tab / iframe / context**
- **Chạy song song dễ dàng** và tối ưu hiệu suất
- **Viết test cả frontend và API** trong cùng bộ framework
- **Tích hợp tốt với CI/CD**: GitHub Actions, GitLab CI, Jenkins, etc.
- **Giả lập thiết bị di động**: viewport, touch, geolocation, permission...

---

## 📌 Khi nào nên chọn Playwright?

- Dự án web cần test trên **nhiều trình duyệt** (bao gồm Safari)
- Cần **test song song hiệu quả**

# 🛠️ Cài Đặt

- Pull code về.
- Chạy lệnh cài đặt Playwright browser và các package liên quan.

```bash
npm install playwright
npm install
```

run:

```bash
 npx playwright test
```

run in UI

```bash
 npx playwright test --ui
```

# 📬 Liên Hệ

Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào, hãy liên hệ với mình qua:

- Email: tranthitulinh1305@gmail.com
- Trang web của mình: https://tulinh.dev/

# 🏃‍♀️ My roadmap

```
├── Giai đoạn 0: Kiến thức Nền tảng ✅
│   ├── Kiến thức về Lập trình
│   │   ├── JavaScript/TypeScript
│   │   │   ├── Cú pháp cơ bản (Biến, Kiểu dữ liệu, Toán tử, Điều kiện, Vòng lặp) ✅
│   │   │   └── Hàm, Callback, Promise, Async/Await ✅
│   │   └── Node.js & npm/yarn ✅
│   ├── Kiến thức về Web
│   │   ├── HTML (Cấu trúc) ✅
│   │   ├── CSS (Styling, Selectors) ✅
│   │   └── DOM (Cây cấu trúc) ✅
│   └── Hệ thống quản lý phiên bản
│       └── Git (Cơ bản) ✅
│
├── Giai đoạn 1: Làm quen với Playwright (Cơ bản)
│   ├── Giới thiệu về Playwright ✅
│   ├── Cài đặt Môi trường (Node.js, IDE, Playwright) ✅
│   ├── Viết Test Case đầu tiên
│   │   ├── Cấu trúc test (`test`, `expect`) ✅
│   │   ├── Mở trang (`page.goto`) ✅
│   │   ├── Tìm phần tử (`page.locator`) ✅
│   │   ├── Thao tác cơ bản (click, fill, press) ✅
│   │   └── Assertions cơ bản (toBeVisible, toHaveText, ...) ✅
│   ├── Hiểu về Locators (Các loại: text, css, xpath, role, test ID) ✅
│   ├── Auto-waiting (Cơ chế chờ tự động) ✅
│   └── Cấu hình cơ bản (`playwright.config.ts`) ✅
│
├── Giai đoạn 2: Kỹ thuật Trung cấp
│   ├── Xử lý các loại Phần tử phức tạp (Dropdowns, Checkboxes, Iframes, Dynamic content) ✅
│   ├── Xử lý Dialogs (Alerts, Confirms, Prompts) ✅
│   ├── Chụp ảnh màn hình & Quay video ✅
│   ├── Tracing (Playwright Trace Viewer) ✅
│   ├── Xử lý nhiều Tab/Window  ✅
│   ├── Xử lý Authentication (`storageState`) ✅
│   └── Quản lý Test Suites & Grouping (`describe`, Hooks: beforeEach,afterEach, ...) ✅
│
├── Giai đoạn 3: Nâng cao & Áp dụng vào Dự án
│   ├── Page Object Model (POM)
│   ├── Data-Driven Testing (DDT)
│   ├── API Testing với Playwright (`request` context)
│   ├── Mocking & Handling Network Requests
│   ├── Chạy Parallel Tests
│   ├── Reporters (HTML, JUnit, Tùy chỉnh)
│   ├── Tích hợp CI/CD (GitHub Actions, GitLab CI, Jenkins, ...)
│   └── Xử lý lỗi & Retry
│
├── Giai đoạn 4: Phát triển & Chuyên sâu
│   ├── Tối ưu hiệu suất & Độ tin cậy
│   ├── Kiểm thử Khả năng tiếp cận (Accessibility)
│   ├── Chiến lược Cross-Browser Testing nâng cao
│   └── Mở rộng kiến thức (Deep dive JS/TS, Contribute...)
│
├── Nguồn Học tập quan trọng
│   ├── Tài liệu chính thức của Playwright
│   ├── Kênh YouTube, Blog (Tiếng Việt/Anh)
│   ├── Các Khóa học Online
│   └── Cộng đồng (Slack, Discord, Facebook)
│
└── Lời khuyên
    ├── Thực hành liên tục
    ├── Đọc code/ tham khảo của người khác
    └── Xây dựng Portfolio cá nhân
```
