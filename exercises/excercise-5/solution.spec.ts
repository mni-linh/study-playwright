/* JAVASCRIPT */
// Create a productList object to store the product list
const productList = {
  products: {},

  // Function to add products to the list
  addProduct(name, price) {
    if (!name || price <= 0) {
      console.log("Tên sản phẩm hoặc giá không hợp lệ.");
      return;
    }
    this.products[name] = price;
    console.log(`Đã thêm sản phẩm: ${name}, giá: ${price}`);
  },

  // Function to remove products to the list
  removeProduct(name) {
    if (this.products[name]) {
      delete this.products[name];
      console.log(`Đã xóa sản phẩm: ${name}`);
    } else {
      console.log(`Không tìm thấy sản phẩm: ${name}`);
    }
  },

  // The function calculates the total value of products in the list
  calculateTotal() {
    const total = Object.values(this.products).reduce((sum, price) => sum + price, 0);
    console.log(`Tổng giá trị sản phẩm: ${total}`);
    return total;
  },

  // The function displays a list of products
  displayProducts() {
    console.log("Sản phẩm trong danh sách:");
    for (const [name, price] of Object.entries(this.products)) {
      console.log(`${name}: ${price}`);
    }
  }
};

// Use functions
productList.addProduct("Táo", 5000);
productList.addProduct("Chuối", 3000);
productList.removeProduct("Chuối");
productList.displayProducts();
productList.calculateTotal();

/* PLAYWRIGHT*/
