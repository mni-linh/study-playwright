import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
// Định nghĩa cấu hình, Tập tin này sẽ được Playwright tự động nhận diện khi chạy kiểm thử.
export default defineConfig({
  // Chỉ định thư mục chứa các tệp kiểm thử. Playwright sẽ tìm và chạy tất cả các tệp trong thư mục ./tests.
  testDir: "./daily-exercises/2024-12/30",
  /* Run tests in files in parallel */
  // Bật chế độ chạy các tệp kiểm thử song song để tiết kiệm thời gian. Nếu có bài kiểm thử phụ thuộc lẫn nhau, cần tắt tính năng này (false).
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // Quy định số lần chạy lại khi bài kiểm thử thất bại. Trong CI: Chạy lại tối đa 2 lần nếu bài kiểm thử thất bại. Ở local: Không chạy lại (giá trị 0).
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // Quy định số lượng worker (luồng chạy kiểm thử). Trong CI: Chỉ chạy 1 worker để tránh lỗi song song. Ở local: Để Playwright tự động tối ưu (undefined).
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // Định nghĩa kiểu báo cáo kiểm thử. Tạo báo cáo dạng HTML. Sau khi chạy kiểm thử, bạn có thể mở file playwright-report/index.html để xem kết quả.
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // Cấu hình mặc định áp dụng cho tất cả các dự án. Thu thập thông tin chi tiết khi kiểm thử thất bại lần đầu. Giúp phân tích nguyên nhân lỗi nhanh hơn với Playwright Trace Viewer.
    trace: "on-first-retry",
    ignoreHTTPSErrors: true, // Bỏ qua lỗi HTTPS
  },

  /* Configure projects for major browsers */
  // Định nghĩa các dự án kiểm thử tương ứng với các trình duyệt hoặc thiết bị
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
