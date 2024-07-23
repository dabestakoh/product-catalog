import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { environment as env }  from 'src/environments/environment';
@Component({
  selector: 'app-products-tab',
  templateUrl: './products-tab.page.html',
  styleUrls: ['./products-tab.page.scss'],
})
export class ProductsTabPage implements OnInit {
  products: Product[] = [];
  error: string | null = null;
  environment = env; 
  constructor(private productService: ProductService, private router: Router) { }

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

  viewProductDetail(product: Product){
    this.router.navigate(['/product-detail'], { state: { product } });
  }
}
