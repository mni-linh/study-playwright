/* PLAYWRIGHT*/
import { test } from "@playwright/test";

test.describe("Demo annotation", () => {
  // Hook beforeEach: nếu chạy trên mobile, annotate fixme
  test.beforeEach(async ({ isMobile }) => {
    if (isMobile) {
      test.fixme(true, "This test is marked as fixme on mobile devices.");
    }
  });

  // Test 1: "Test 01"
  test("Test 01", async ({}) => {
    test.info().annotations.push({
      type: "demo",
      description: "https://github.com/playwrightvn/pw-discovery",
    });

    console.log("Hello from test 1");
  });

  // Test 2: "Test 02"
  test("Test 02", async ({ browser }) => {
    console.log("Hello from test 2");

    test.info().annotations.push({
      type: "browser version",
      description: `Browser version: ${browser.version()}`,
    });
  });
});
