/* TYPESCRIPT */

type Product = {
  name: string;
  price: number;
  quantity: number;
  category: string;
};

function calculateRevenueByCategory(
  products: Product[]
): Record<string, number> {
  const revenueByCategory: Record<string, number> = {};

  products.forEach((product) => {
    const { category, price, quantity } = product;
    const revenue = price * quantity;

    if (revenueByCategory[category]) {
      revenueByCategory[category] += revenue;
    } else {
      revenueByCategory[category] = revenue;
    }
  });

  return revenueByCategory;
}

// Test cases
const products1: Product[] = [
  { name: "Bánh chưng", price: 200000, quantity: 10, category: "Bánh kẹo" },
  { name: "Hoa đào", price: 500000, quantity: 5, category: "Hoa" },
  { name: "Mứt tết", price: 150000, quantity: 20, category: "Bánh kẹo" },
  { name: "Giỏ quà Tết", price: 1000000, quantity: 3, category: "Quà biếu" },
];

const products2: Product[] = [
  { name: "Cây quất", price: 1000000, quantity: 2, category: "Hoa" },
  { name: "Hạt dưa", price: 100000, quantity: 30, category: "Bánh kẹo" },
  {
    name: "Hộp quà biếu cao cấp",
    price: 2000000,
    quantity: 1,
    category: "Quà biếu",
  },
];

const products3: Product[] = [
  { name: "Lì xì đỏ", price: 10000, quantity: 100, category: "Phụ kiện" },
  { name: "Hoa mai", price: 700000, quantity: 4, category: "Hoa" },
];

console.log(calculateRevenueByCategory(products1));

console.log(calculateRevenueByCategory(products2));

console.log(calculateRevenueByCategory(products3));
