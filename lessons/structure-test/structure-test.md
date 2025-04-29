# Cấu trúc Test (`test`, `expect`) trong Playwright

Trong Playwright, chúng ta sử dụng hai thành phần chính để viết và thực hiện các test: **`test`** và **`expect`**.

## 1. `test`

`test` là một hàm được sử dụng để mô tả các kịch bản kiểm thử. Mỗi test bao gồm ba phần:

- **Tên test**: Mô tả kịch bản kiểm thử.
- **Callback function**: Hàm chứa logic kiểm thử, có thể nhận đối tượng `page`, `browser` hoặc `context` từ Playwright.
- **Assertions**: Các điều kiện kiểm tra được thực hiện trong test.

### Cấu trúc cơ bản:

```javascript
test("Tên test", async ({ page }) => {
  // Test code here
});
```

## 2. `expect`

`expect` là đối tượng kiểm tra trong Playwright. Nó được sử dụng để thực hiện các assertions và xác nhận các điều kiện trong quá trình kiểm thử. Bạn có thể sử dụng `expect` để kiểm tra các yếu tố trên trang web, giá trị của biến, hoặc bất kỳ đối tượng nào khác.

**Các kiểu assertion phổ biến trong Playwright:**

- `toBe()`: Kiểm tra giá trị bằng đúng một giá trị cụ thể.
- `toHaveText()`: Kiểm tra nếu phần tử có nội dung văn bản cụ thể.
- `toHaveClass()`: Kiểm tra nếu phần tử có lớp CSS cụ thể.
- `toBeVisible()`: Kiểm tra nếu phần tử hiển thị.
- `toHaveURL()`: Kiểm tra URL của trang hiện tại.
- `toBeTruthy()`: Kiểm tra nếu giá trị là true hoặc bất kỳ giá trị chân thật nào.
- `toHaveAttribute()`: Kiểm tra nếu phần tử có thuộc tính cụ thể.

**_Ví dụ sử dụng expect:_**

```javascript
expect(locator).toBeVisible(); // Kiểm tra phần tử có hiển thị không
expect(locator).toHaveText("Hello World"); // Kiểm tra nội dung văn bản
expect(locator).toHaveClass("btn-primary"); // Kiểm tra lớp CSS
```

**Các chức năng nâng cao:**

****beforeAll / afterAll:****

- **beforeAll:** Được gọi trước tất cả các test.
- **afterAll:** Được gọi sau tất cả các test.

Ví dụ:

```javascript
test.beforeAll(async () => {
  console.log("Set up before all tests");
});

test.afterAll(async () => {
  console.log("Clean up after all tests");
});
```

****beforeEach / afterEach:****

- **beforeEach:** Được gọi trước mỗi test.
- **afterEach:** Được gọi sau mỗi test.

Ví dụ:

```javascript
test.beforeEach(async () => {
  console.log("Set up before each test");
});

test.afterEach(async () => {
  console.log("Clean up after each test");
});
```
