import { ProductManager } from "./product-manager";
import { Product } from "./product";
import * as readlineSync from "readline-sync";

const product_manager = new ProductManager();

console.log("Welcome to Product Management System App");

const showMenu = () => {
  console.log("Choose an option: ");
  console.log("1. Add Product");
  console.log("2. Remove Product");
  console.log("3. Search PRoduct");
  console.log("4. Display Products");
  console.log("5. Exit");
};

const addProductFromUser = () => {
  const id = parseInt(readlineSync.question("Enter product ID: "));
  const name = readlineSync.question("Enter product name: ");
  const price = parseFloat(readlineSync.question("Enter product price: "));
  const rating = parseFloat(readlineSync.question("Enter product rating: "));
  const reviewsCount = parseInt(
    readlineSync.question("Enter product reviews count: ")
  );
  const brand = readlineSync.question("Enter product brand: ");
  const category = readlineSync.question("Enter product category: ");

  const newProduct: Product = {
    id,
    name,
    price,
    rating,
    reviewsCount,
    brand,
    category,
  };

  product_manager.addProduct(newProduct);
  console.log("Product added successfully!");
};

const removeProductFromUser = () => {
  const idToRemove = parseInt(
    readlineSync.question("Enter product ID to remove: ")
  );
  product_manager.removeProduct(idToRemove);
};

const searchProductByCategory = () => {
  const category = readlineSync.question("Enter category to search: ");
  const matchingProducts = product_manager.searchProductByCategory(category);

  if (matchingProducts.length > 0) {
    console.log(`Products in category "${category}":`);
    console.log(matchingProducts);
  } else {
    console.log(`No products found in category "${category}".`);
  }
};

const displayProducts = () => {
  console.log("Current Products List:");
  const products = product_manager.listProducts();
  if (products.length > 0) {
    console.log(products);
  } else {
    console.log("No products available.");
  }
};

let exit = false;

while (!exit) {
  showMenu();
  const choice = parseInt(readlineSync.question("Enter your choice (1-4): "));

  switch (choice) {
    case 1:
      addProductFromUser();
      break;
    case 2:
      removeProductFromUser();
      break;
    case 3:
      searchProductByCategory();
      break;
    case 4:
      displayProducts();
      break;
    case 5:
      console.log("Exiting the program. Goodbye!");
      exit = true;
      break;
    default:
      console.log("Invalid choice. Please select a valid option.");
      break;
  }
}
