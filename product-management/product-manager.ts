import { Product } from "./product";

export class ProductManager {
  private products: Product[] = [];

  addProduct(product: Product): void {
    this.products.push(product);
  }

  listProducts(): Product[] {
    return this.products;
  }

  removeProduct(id: number): void {
    const initialLength = this.products.length; // Store the initial length
    this.products = this.products.filter((product) => product.id !== id); // Filter out the product
    if (this.products.length < initialLength) {
      console.log(`Product with ID ${id} removed successfully!`);
    } else {
      console.log(`Product with ID ${id} not found.`);
    }
  }

  searchProduct(id: number) {
    console.log(this.products.find((product) => product.id === id));
  }

  searchProductByCategory(category: string): Product[] {
    return this.products.filter((product) => product.category === category);
  }
}
