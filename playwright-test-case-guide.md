# 🧪 Hướng dẫn Viết Test Case bằng Playwright

## ✅ 1. Nhóm tổ chức Test (Test Structure)

| Hàm                 | Mô tả                                                |
| ------------------- | ---------------------------------------------------- |
| `test()`            | Khai báo một test case cụ thể.                       |
| `test.describe()`   | Nhóm các test lại với nhau theo tính năng/chức năng. |
| `test.beforeEach()` | Thực thi trước mỗi test, thường dùng để setup.       |
| `test.afterEach()`  | Thực thi sau mỗi test, thường dùng để clean up.      |
| `test.only()`       | Chạy duy nhất một test để debug.                     |
| `test.skip()`       | Bỏ qua một test case tạm thời.                       |

### Ví dụ:

```ts
test.describe("Đăng nhập", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://example.com/login");
  });

  test("Đăng nhập thành công", async ({ page }) => {
    await page.fill("#username", "linh2000");
    await page.fill("#password", "123456");
    await page.click('button[type="submit"]');
    await expect(page.getByText("Chào mừng")).toBeVisible();
  });
});
```

## ✅ 2. Nhóm tương tác với giao diện người dùng (UI Interaction)

| Hàm                                | Mô tả                              |
| ---------------------------------- | ---------------------------------- |
| page.goto(url)                     | Truy cập URL cụ thể                |
| page.click(selector)               | Click vào phần tử                  |
| page.fill(selector, text)          | Nhập văn bản vào ô input/textarea. |
| page.fill(selector, text)          | Nhập văn bản vào ô input/textarea. |
| page.press(selector, key)          | Nhấn phím tại phần tử cụ thể.      |
| page.check(selector)               | Check checkbox.                    |
| page.uncheck(selector)             | Uncheck checkbox.                  |
| page.selectOption(selector, value) | Chọn giá trị trong dropdown.       |
| page.hover(selector)               | Di chuột vào phần tử.              |
| page.waitForSelector(selector)     | Chờ phần tử xuất hiện.             |
| page.screenshot()                  | Chụp màn hình trang hoặc phần tử.  |

## ✅ 3. Nhóm kiểm tra kết quả (Assertions)

| Hàm                                 | Mô tả                            |
| ----------------------------------- | -------------------------------- |
| expect(locator).toBeVisible()       | Kiểm tra phần tử hiển thị        |
| expect(locator).toHaveText(text)    | Kiểm tra text chính xác          |
| expect(locator).toHaveValue(value)  | Kiểm tra giá trị trong input.    |
| expect(locator).toBeChecked()       | Kiểm tra checkbox đã được chọn.  |
| expect(locator).toBeDisabled()      | Kiểm tra phần tử bị disable.     |
| expect(locator).toContainText(text) | Kiểm tra phần tử chứa đoạn text. |

## ✅ 4. Một số tiện ích hỗ trợ 

| Hàm                    | Mô tả                             |
| ---------------------- | --------------------------------- |
| test.use()             | Gán config cho từng test.         |
| test.info()            | Truy cập thông tin test hiện tại. |
| page.locator(selector) | Kiểm tra giá trị trong input.     |
| page.getByRole(...)    | Kiểm tra checkbox đã được chọn.   |
| page.getByLabel(...)   | Kiểm tra phần tử bị disable.      |
