# Tracing (Playwright Trace Viewer)

Playwright Tracing giúp bạn ghi lại các hoạt động trong quá trình test để debug hoặc kiểm tra sau đó. Nó rất hữu ích khi bạn muốn biết điều gì đã xảy ra khi test thất bại.

## 1. Bật Trace trong Playwright

Trong `playwright.config.ts`:

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    trace: 'on-first-retry', // hoặc 'on', 'retain-on-failure'
  },
});
```

## 2. Thu thập Trace theo cách thủ công

```ts
import { test } from '@playwright/test';

test('Trace demo', async ({ page, context }) => {
  await context.tracing.start({ screenshots: true, snapshots: true });
  await page.goto('https://playwright.dev');
  await page.getByRole('link', { name: 'Docs' }).click();
  await context.tracing.stop({ path: 'trace.zip' });
});
```

## 3. Xem Trace

Sau khi bạn đã có file `trace.zip`, mở Trace Viewer bằng lệnh:

```bash
npx playwright show-trace trace.zip
```

## 4. Các chế độ trace

- `off`: Không lưu gì cả (mặc định)
- `on`: Luôn thu thập trace
- `retain-on-failure`: Chỉ lưu nếu test fail
- `on-first-retry`: Lưu khi chạy lại lần đầu

## Lưu ý

- Trace ghi lại toàn bộ hành vi của browser, giúp bạn dễ dàng phân tích khi test bị lỗi.
- Trace có thể nặng nên chỉ nên bật ở các môi trường cần thiết như CI/CD hoặc khi debug.