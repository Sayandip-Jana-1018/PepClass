// ===============================
// PRODUCT DATABASE
// ===============================

const products = [
  {
    id: 1,
    name: "Product 1",
    desc: "This is description",
    price: 100,
    category: "Laptop",
  },
  {
    id: 2,
    name: "Product 2",
    desc: "This is description",
    price: 120,
    category: "Desktop",
  },
  {
    id: 3,
    name: "Product 3",
    desc: "This is description",
    price: 150,
    category: "Laptop",
  },
  {
    id: 4,
    name: "Product 4",
    desc: "This is description",
    price: 100,
    category: "Laptop",
  },
  {
    id: 5,
    name: "Product 5",
    desc: "This is description",
    price: 120,
    category: "Desktop",
  },
  {
    id: 6,
    name: "Product 6",
    desc: "This is description",
    price: 150,
    category: "Laptop",
  },
];

// ===============================
// CART & USER
// ===============================

let cart = [];
const userEmail = "john@gmail.com";

// ===============================
// DISPLAY ALL PRODUCTS
// ===============================

function displayProducts() {

  console.log("\n--- AVAILABLE PRODUCTS ---");

  products.forEach((products, index) => {

    console.log(
      `${index + 1} - ${products.id} - ${products.name} - ${products.desc} - ₹${products.price} - ${products.category}`
    );

  });

  console.log("---------------------------\n");
}

// ===============================
// ADD TO CART
// ===============================

function addToCart(productId) {

  const product = products.find(p => p.id === productId);

  if (!product) {
    console.log("Product not found");
    return;
  }

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {

    cart.push({
      ...product,
      quantity: 1,
    });

  }

  console.log(`${product.name} added to cart`);
}

// ===============================
// INCREMENT
// ===============================

function increment(productId) {

  const item = cart.find(p => p.id === productId);

  if (item) {
    item.quantity++;
    console.log(`${item.name} quantity increased`);
  } else {
    console.log("Item not found in cart");
  }
}

// ===============================
// DECREMENT
// ===============================

function decrement(productId) {

  const index = cart.findIndex(p => p.id === productId);

  if (index === -1) {
    console.log("Item not found in cart");
    return;
  }

  if (cart[index].quantity > 1) {

    cart[index].quantity--;
    console.log(`${cart[index].name} quantity decreased`);

  } else {

    console.log(`${cart[index].name} removed from cart`);
    cart.splice(index, 1);

  }
}

// ===============================
// DISPLAY CART
// ===============================

function displayCart() {

  console.log("\n--- YOUR CART ---");

  if (cart.length === 0) {
    console.log("Cart is empty");
    return;
  }

  cart.forEach((products, index) => {

    const total = products.price * products.quantity;

    console.log(
      `${index + 1} - ${products.name} - ${products.desc} - ₹${products.price} - Qty: ${products.quantity} - Total: ₹${total}`
    );

  });

  console.log("-----------------\n");
}

// ===============================
// CALCULATE TOTAL
// ===============================

function calculateTotal() {

  let total = 0;

  for (let products of cart) {
    total += products.price * products.quantity;
  }

  return total;
}

// ===============================
// PLACE ORDER
// ===============================

function placeOrder() {

  if (cart.length === 0) {
    console.log("Cart is empty. Cannot place order.");
    return;
  }

  const total = calculateTotal();

  console.log("Email:", userEmail);
  console.log("-------------------------------------");

  cart.forEach((products, index) => {

    const itemTotal = products.price * products.quantity;

    console.log(
      `${index + 1} - ${products.name} - ${products.desc} - ₹${products.price} - Qty: ${products.quantity} - Total: ₹${itemTotal}`
    );

  });

  console.log("-------------------------------------");
  console.log("TOTAL AMOUNT: ₹", total);
  console.log("STATUS: Order Placed Successfully");

  // Clear cart
  cart = [];
}

// ===============================
// MAIN EXECUTION
// ===============================

// Show all products
displayProducts();

// Add to cart
addToCart(1);
addToCart(3);
addToCart(5);

// Show cart
displayCart();

// Update quantity
increment(1);
increment(5);

displayCart();

// Remove items
decrement(1);
decrement(1);

displayCart();

// Place order
placeOrder();
