import { ProductManager } from "./product-manager";
import { Product } from "./product";
import * as readlineSync from "readline-sync";
import * as fs from "fs";

const product_manager = new ProductManager();

console.log("Welcome to Product Management System App");

const showMenu = () => {
  console.log("Choose an option: ");
  console.log("1. Add Product");
  console.log("2. Remove Product");
  console.log("3. Search Product");
  console.log("4. Update Product");
  console.log("5. Display Products");
  console.log("6. Save Product");
  console.log("7. Exit");
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

const updateProduct = () => {
  const product_update = parseInt(
    readlineSync.question("Enter Product Id to update: ")
  );

  const present_product = product_manager
    .listProducts()
    .find((product) => product.id === product_update);

  if (!present_product) {
    console.log(`Product with Id ${product_update} not found`);
    return;
  }

  console.log(`Updating Product with ID ${product_update}`);

  const updateChoice = readlineSync
    .question(
      "Enter field to update (name, price, rating, reviewsCount, brand, category): "
    )
    .toLowerCase();

  let updatedFields: Partial<Product> = {};

  switch (updateChoice) {
    case "name":
      updatedFields.name = readlineSync.question("Enter new name: ");
      break;
    case "price":
      updatedFields.price = parseFloat(
        readlineSync.question("Enter new price: ")
      );
      break;
    case "rating":
      updatedFields.rating = parseFloat(
        readlineSync.question("Enter new rating: ")
      );
      break;
    case "reviewsCount":
      updatedFields.reviewsCount = parseInt(
        readlineSync.question("Enter new reviews count: ")
      );
      break;
    case "brand":
      updatedFields.brand = readlineSync.question("Enter new brand: ");
      break;
    case "category":
      updatedFields.category = readlineSync.question("Enter new category: ");
      break;
    default:
      console.log("Invalid field. Please select a valid option.");
      return;
  }

  product_manager.updateProduct(product_update, updatedFields);
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

const saveProduct = () => {
  const save_product = product_manager.listProducts();
  if (save_product.length > 0) {
    fs.writeFileSync(
      "product.json",
      JSON.stringify(save_product, null, 2),
      "utf-8"
    );
    console.log("Product saved");
  } else {
    console.log("No product available to save");
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
      updateProduct();
      break;
    case 5:
      displayProducts();
      break;
    case 6:
      saveProduct();
      break;
    case 7:
      console.log("Exiting the program. Goodbye!");
      exit = true;
      break;

    default:
      console.log("Invalid choice. Please select a valid option.");
      break;
  }
}
