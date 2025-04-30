# Quản lý Test Suites & Grouping trong Playwright

## 1. Giới thiệu

Trong Playwright, quản lý các test suite và grouping tests có thể được thực hiện bằng cách sử dụng các cấu trúc `describe`, các hooks như `beforeEach`, `afterEach`, và `beforeAll`, `afterAll`. Những công cụ này giúp bạn tổ chức mã kiểm thử một cách rõ ràng và dễ quản lý hơn, đặc biệt khi bạn cần tái sử dụng các đoạn mã trước và sau mỗi lần kiểm thử.

Dưới đây là các khái niệm và ví dụ chi tiết về cách sử dụng:

---

## 2. Quản lý test suites với `describe`

`describe` giúp bạn nhóm các test cases lại với nhau theo một chủ đề hoặc hành động chung. Điều này giúp bạn dễ dàng đọc và duy trì các bài kiểm tra khi có nhiều test case có liên quan.

```ts
describe("Test suite name", () => {
  // Các test case liên quan đến Test Suite này
  it("should do something", async () => {
    // Test logic ở đây
  });

  it("should do another thing", async () => {
    // Test logic ở đây
  });
});
```

---

## 3. Hooks (`beforeEach`, `afterEach`, `beforeAll`, `afterAll`)

### 3.1 `beforeEach` & `afterEach`

- `beforeEach`: Chạy trước mỗi test case.

- `afterEach`: Chạy sau mỗi test case.

```ts
import { test, expect } from "@playwright/test";

test.describe("Login tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://example.com/login");
  });

  test.afterEach(async ({ page }) => {
    // Có thể logout hoặc reset sau mỗi test
  });

  test("Login thành công", async ({ page }) => {
    await page.fill("#username", "admin");
    await page.fill("#password", "password");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/dashboard/);
  });
});
```

### 3.2 `beforeAll` và `afterAll`

- `beforeAll`: Chạy trước tất cả các test trong suite.
- `afterAll`: Chạy sau tất cả các test trong suite.

```ts
test.describe("Setup trước tất cả test", () => {
  test.beforeAll(async ({ browser }) => {
    // Có thể tạo dữ liệu ban đầu hoặc khởi tạo database
  });

  test.afterAll(async () => {
    // Dọn dẹp dữ liệu hoặc đóng connection
  });

  test("Test 1", async ({ page }) => {
    // ...
  });

  test("Test 2", async ({ page }) => {
    // ...
  });
});
```

---

## 4. Grouping Test Cases with describe and Hooks

Kết hợp describe và hooks giúp tổ chức các test suite rõ ràng và đảm bảo setup/teardown được thực hiện chính xác.

- Ví dụ kết hợp:

```ts
import { test, expect } from "@playwright/test";

describe("GitHub Authentication Tests", () => {
  let page;

  // Setup (Chạy trước tất cả các tests trong suite)
  beforeAll(async () => {
    page = await browser.newPage();
    console.log("Starting tests...");
  });

  // Cleanup (Chạy sau tất cả các tests trong suite)
  afterAll(async () => {
    await page.close();
    console.log("Ending tests...");
  });

  describe("Login tests", () => {
    beforeEach(async () => {
      // Setup cho mỗi test case
      await page.goto("https://github.com/login");
    });

    test("should log in successfully with valid credentials", async () => {
      await page.fill("#login_field", "your-username");
      await page.fill("#password", "your-password");
      await page.click('input[type="submit"]');
      await expect(page).toHaveURL("https://github.com/");
    });

    test("should show error message for invalid credentials", async () => {
      await page.fill("#login_field", "invalid-user");
      await page.fill("#password", "invalid-password");
      await page.click('input[type="submit"]');
      await expect(page.locator(".flash-error")).toBeVisible();
    });
  });
});
```

---

## 5. Chạy theo `test.describe`

Bạn có thể chạy 1 nhóm test cụ thể bằng cách dùng:

```bash
npx playwright test --grep "Form Login"
```

Hoặc đặt `.only` vào nhóm hoặc test:

```ts
test.describe.only("Form Login", () => {
  // chỉ chạy các test trong đây
});
```

---

## ✅ Tổng kết

- `describe`: Được sử dụng để nhóm các test cases có liên quan vào trong một suite.

- `beforeEach`, `afterEach`: Thực hiện các hành động setup hoặc teardown trước và sau mỗi test case.

- `beforeAll`, `afterAll`: Thực hiện các hành động setup hoặc teardown một lần cho tất cả các test trong suite.
