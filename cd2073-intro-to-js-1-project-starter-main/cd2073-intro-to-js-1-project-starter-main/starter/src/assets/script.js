// Create an array named products to hold product object literals
const products = [
  {
    name: "Cherry",
    price: 2.79,
    quantity: 0,
    productId: 1,
    image: "images/cherry.jpg"
  },
  {
    name: "Orange",
    price: 1.79,
    quantity: 0,
    productId: 2,
    image: "images/orange.jpg"
  },
  {
    name: "Strawberry",
    price: 3.19,
    quantity: 0,
    productId: 3,
    image: "images/strawberry.jpg"
  }
];

// Declare an empty array named cart to hold items in the cart
const cart = [];

// Function to add a product to the cart
function addProductToCart(productId) {
  const product = getProductById(productId);
  if (product) {
    product.quantity++;
    if (!cart.includes(product)) {
      cart.push(product);
    }
  }
}

// Function to increase the quantity of a product in the cart
function increaseQuantity(productId) {
  const product = getProductById(productId);
  if (product) {
    product.quantity++;
  }
}

// Function to decrease the quantity of a product in the cart
function decreaseQuantity(productId) {
  const product = getProductById(productId);
  if (product) {
    if (product.quantity > 0) {
      product.quantity--;
      if (product.quantity === 0) {
        removeProductFromCart(productId);
      }
    }
  }
}

// Function to remove a product from the cart
function removeProductFromCart(productId) {
  const product = products.find((item) => item.productId === productId);
  if (product) {
    product.quantity = 0;
    cart.splice(cart.indexOf(product), 1);
  }
}

// Function to calculate the total price of items in the cart
function cartTotal() {
  return cart.reduce((total, product) => total + (product.price * product.quantity), 0);
}

// Function to empty the cart
function emptyCart() {
  cart.forEach((product) => {
    product.quantity = 0;
  });
  cart.length = 0;
}

// Function to get a product by its productId
function getProductById(productId) {
  return products.find((item) => item.productId === productId);
}
// Function to handle payment
// Variable to track the total amount paid
let totalPaid = 0;

function pay(amount) {
    // Add the current payment amount to the totalPaid variable
    totalPaid += amount;

    // Calculate the difference between the totalPaid and the cartTotal
    let remaining = totalPaid - cartTotal();

    // Check if the remaining amount is greater than or equal to zero
    if (remaining >= 0) {
        // If so, reset the `totalPaid` to zero to prepare it for the next
        // payment, as the current payment is enough to cover the `cartTotal`.
        totalPaid = 0;
        emptyCart()
    }

    // Return the remaining (negative if payment is less than the cartTotal)
    return remaining;
}

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart
};