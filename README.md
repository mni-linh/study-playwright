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

