/* PLAYWRIGHT */
import { test, expect } from "@playwright/test";

const keyword = "iPhone 16";

test("Check iPhone 16 prices between TGDD and DDV", async ({ context }) => {
  /**
   * Step 1: Mở trang Thegioididong (TGDD)
   */
  const firstPage = await context.newPage(); // Tạo tab mới
  await firstPage.goto("https://www.thegioididong.com/"); // Điều hướng đến TGDD

  /**
   * Step 2: Tìm kiếm sản phẩm trên TGDD
   */
  await firstPage
    .locator('//input[@class="input-search"]') // Tìm ô tìm kiếm
    .fill(`${keyword}`); // Nhập từ khóa tìm kiếm
  await firstPage.keyboard.press("Enter"); // Nhấn Enter để tìm kiếm
  await firstPage.waitForTimeout(10000); // Đợi 10 giây để trang tải kết quả

  /**
   * Step 3: Kiểm tra sản phẩm đầu tiên hiển thị đúng tên
   */
  const productLocatorTGDD = firstPage.locator(
    `(//ul[@class="listproduct"]/li)[1]`
  );
  expect(await productLocatorTGDD).toContainText("iPhone 16 Pro Max 256GB");

  /**
   * Step 4: Lấy giá sản phẩm đầu tiên trên TGDD
   */
  const priceOfFirstProductFP = await firstPage
    .locator(`(//ul[@class="listproduct"]/li)[1]//strong[@class="price"]`)
    .innerText();
  const priceFP = priceOfFirstProductFP.replace(/[^\d]/g, ""); // Chỉ lấy số từ chuỗi giá

  /**
   * Step 5: Mở trang Didongviet (DDV)
   */
  const secondPage = await context.newPage(); // Mở tab mới
  await secondPage.goto("https://didongviet.vn/"); // Điều hướng đến DDV

  /**
   * Step 6: Tìm kiếm sản phẩm trên DDV
   */
  await secondPage
    .locator(`(//input[@id="input-search"])[1]`) // Tìm ô tìm kiếm
    .fill(`${keyword}`); // Nhập từ khóa tìm kiếm
  await secondPage.keyboard.press("Enter"); // Nhấn Enter để tìm kiếm
  await secondPage.waitForTimeout(10000); // Đợi 10 giây để trang tải kết quả

  /**
   * Step 7: Kiểm tra sản phẩm đầu tiên hiển thị đúng tên
   */
  const productLocatorDDV = secondPage.locator(
    `(//div[@class="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4"]/div)[1]`
  );
  expect(await productLocatorDDV).toContainText(
    "iPhone 16 128GB Chính Hãng (VN/A)"
  );

  /**
   * Step 8: Lấy giá sản phẩm đầu tiên trên DDV
   */
  const priceOfFirstProductSP = await secondPage
    .locator(
      `(//div[@class="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4"]/div)[1]//p[@class="font-bold !text-17"]`
    )
    .innerText();
  const priceSP = priceOfFirstProductSP.replace(/[^\d]/g, ""); // Chỉ lấy số từ chuỗi giá

  /**
   * Step 9: So sánh giá giữa TGDD và DDV
   */
  if (priceFP > priceSP) {
    console.log("DDV is cheaper than TGDD");
    if (Number(priceSP) > 25000000) {
      // Kiểm tra khả năng mua hàng dựa trên giá
      console.log(`Tôi không đủ tiền mua`);
    } else {
      console.log(`Tôi đã đủ tiền mua`);
    }
  } else {
    console.log("TGDD is cheaper than DDV");
    if (Number(priceFP) > 25000000) {
      // Kiểm tra khả năng mua hàng dựa trên giá
      console.log(`Tôi không đủ tiền mua`);
    } else {
      console.log(`Tôi đã đủ tiền mua`);
    }
  }
});
