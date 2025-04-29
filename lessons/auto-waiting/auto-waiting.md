
# Auto-waiting trong Playwright

## 🧠 Khái niệm

Auto-waiting (Cơ chế chờ tự động) là một tính năng mặc định trong Playwright giúp xử lý các tình huống bất đồng bộ trong web app. Thay vì bạn phải viết các đoạn `wait` thủ công, Playwright sẽ tự động chờ phần tử sẵn sàng trước khi thực hiện hành động.

## 🛠️ Cách hoạt động

Playwright tự động chờ cho các điều kiện sau khi tương tác với phần tử:

- Phần tử phải **hiển thị trong DOM**
- Phần tử phải **có thể tương tác** (không bị disable, không bị che khuất)
- Không có **animation hoặc chuyển tiếp** đang xảy ra

## ✅ Lợi ích

- **Giảm flakiness**: Giúp test ổn định hơn, ít bị lỗi do thời gian tải trang khác nhau.
- **Đơn giản hóa code**: Không cần chèn `waitForTimeout`, `waitForSelector`, v.v.
- **Hiệu suất tối ưu**: Chỉ chờ khi cần thiết, không chờ dư.

## 🔍 Ví dụ

```ts
import { test, expect } from '@playwright/test';

test('Auto-waiting demo', async ({ page }) => {
  await page.goto('https://example.com');

  // Playwright sẽ tự động chờ nút hiển thị và có thể click được
  await page.locator('text=Get Started').click();

  // Tự động chờ phần tử hiển thị để kiểm tra text
  await expect(page.locator('h1')).toHaveText('Welcome');
});
```

## 📝 Ghi chú

- Bạn không nên dùng `waitForTimeout()` trừ khi thật sự cần, vì sẽ làm giảm hiệu suất và độ tin cậy.
- Nếu cần kiểm soát sâu hơn, bạn có thể dùng `waitForSelector()` với timeout tùy chỉnh.

---

💡 **Auto-waiting là một trong những tính năng mạnh mẽ nhất của Playwright giúp viết test ngắn gọn, sạch và ít lỗi hơn.**
