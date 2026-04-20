// ============================================
// Product Class
// ============================================
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// ============================================
// Shopping Cart Item Class
// ============================================
class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  // Calculate total price of this item (price * quantity)
  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

// ============================================
// Shopping Cart Class
// ============================================
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  // Add item to cart (updates quantity if product already exists)
  addItem(product, quantity) {
    const existingItem = this.items.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      console.log(`Updated quantity for ${product.name}. New quantity: ${existingItem.quantity}`);
    } else {
      this.items.push(new ShoppingCartItem(product, quantity));
      console.log(`Added ${product.name} to cart. Quantity: ${quantity}`);
    }
  }

  // Remove item from cart by product ID
  removeItem(productId) {
    const index = this.items.findIndex(item => item.product.id === productId);

    if (index !== -1) {
      const removedProduct = this.items[index].product.name;
      this.items.splice(index, 1);
      console.log(`Removed ${removedProduct} from cart.`);
    } else {
      console.log(`Product with ID ${productId} not found in cart.`);
    }
  }

  // Get total number of items in cart
  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Display all items in cart with formatted output
  displayCart() {
    console.log("\n========== SHOPPING CART ==========");
    
    if (this.items.length === 0) {
      console.log("Cart is empty.");
    } else {
      console.log(`Total items in cart: ${this.getTotalItems()}\n`);

      let cartTotal = 0;
      this.items.forEach((item, index) => {
        const itemTotal = item.getTotalPrice();
        cartTotal += itemTotal;
        console.log(`${index + 1}. ${item.product.name}`);
        console.log(`   ID: ${item.product.id}`);
        console.log(`   Price: $${item.product.price.toFixed(2)}`);
        console.log(`   Quantity: ${item.quantity}`);
        console.log(`   Total: $${itemTotal.toFixed(2)}\n`);
      });

      console.log(`Grand Total: $${cartTotal.toFixed(2)}`);
    }
    console.log("===================================\n");
  }
}

// ============================================
// TESTING THE OBJECTS
// ============================================

console.log("=== SHOPPING CART SYSTEM TEST ===\n");

// Create products
console.log("1. Creating products...");
const product1 = new Product(1, "Laptop", 999.99);
const product2 = new Product(2, "Mouse", 25.50);
const product3 = new Product(3, "Keyboard", 75.00);
const product4 = new Product(4, "Monitor", 299.99);
console.log("✓ Products created successfully\n");

// Create a shopping cart
console.log("2. Creating shopping cart...");
const cart = new ShoppingCart();
console.log("✓ Shopping cart created\n");

// Add items to the cart
console.log("3. Adding items to cart...");
cart.addItem(product1, 1);
cart.addItem(product2, 2);
cart.addItem(product3, 1);
cart.addItem(product4, 1);
console.log();

// Display the cart
console.log("4. Displaying cart contents:");
cart.displayCart();

// Remove an item from the cart
console.log("5. Removing Mouse (ID: 2) from cart...");
cart.removeItem(2);
console.log();

// Display the cart again to verify removal
console.log("6. Displaying updated cart contents:");
cart.displayCart();

// Additional test: Try adding same product again to test quantity update
console.log("7. Adding more Keyboards (ID: 3)...");
cart.addItem(product3, 2);
console.log();

console.log("8. Final cart contents:");
cart.displayCart();

console.log("=== TEST COMPLETE ===");
