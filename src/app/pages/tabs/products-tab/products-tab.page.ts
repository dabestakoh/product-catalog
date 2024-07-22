import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-tab',
  templateUrl: './products-tab.page.html',
  styleUrls: ['./products-tab.page.scss'],
})
export class ProductsTabPage implements OnInit {
  products: Product[] = [];
  error: string | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
        this.error = 'Error fetching products. Please try again later.';
      }
    );
  }

  calculateDiscountedPrice(product: Product): number {
    if (product.discount > 0) {
      return product.price - (product.price * (product.discount / 100));
    }
    return product.price;
  }
}
