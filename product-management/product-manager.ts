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
    const initialLength = this.products.length;
    this.products = this.products.filter((product) => product.id !== id);
    if (this.products.length < initialLength) {
      console.log(`Product with ID ${id} removed successfully!`);
    } else {
      console.log(`Product with ID ${id} not found.`);
    }
  }

  // searchProduct(id: number) {
  //   console.log(this.products.find((product) => product.id === id));
  // }

  searchProductByCategory(category: string): Product[] {
    return this.products.filter((product) => product.category === category);
  }

  updateProduct(id:number, updatedFields:Partial<Product>):void{
    const product_index = 
    this.products.findIndex((product)=>product.id === id);

    if(product_index !== -1){
      this.products[product_index] = {...this.products[product_index],...updatedFields};
      console.log(`product with ID ${id} updated`);
    }else{
      console.log(`Product with ID ${id} not found`);
    }
  }
}
