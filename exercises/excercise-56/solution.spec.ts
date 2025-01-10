/* TYPESCRIPT */

type Ingredients = {
  gaoNep: number;
  doXanh: number;
  thitLon: number;
  hanhCu: number;
};

function calculateIngredients(numBanh: number): Ingredients {
  if (!Number.isInteger(numBanh) || numBanh <= 0) {
    throw new Error("Số lượng bánh phải là số nguyên dương.");
  }

  const ingredientsPerBanh = {
    gaoNep: 200,
    doXanh: 50,
    thitLon: 100,
    hanhCu: 5,
  };

  return {
    gaoNep: ingredientsPerBanh.gaoNep * numBanh,
    doXanh: ingredientsPerBanh.doXanh * numBanh,
    thitLon: ingredientsPerBanh.thitLon * numBanh,
    hanhCu: ingredientsPerBanh.hanhCu * numBanh,
  };
}

// Test cases
try {
  const numBanh1 = 10;
  console.log(calculateIngredients(numBanh1));

  const numBanh2 = 5;
  console.log(calculateIngredients(numBanh2));

  const numBanh3 = 0;
  console.log(calculateIngredients(numBanh3));

  const numBanh4 = 50;
  console.log(calculateIngredients(numBanh4));
} catch (error) {
  console.error(error.message);
}
