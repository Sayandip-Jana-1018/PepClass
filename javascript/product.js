import { products } from "./data.js";

export default function displayProducts() {

  console.log("------ PRODUCT LIST ------");

  products.forEach((product, index) => {

    console.log(
      `${index + 1} - ${product.name} - ${product.category} - ₹${product.price} - ${product.desc}`
    );

  });

  console.log("--------------------------");
}
