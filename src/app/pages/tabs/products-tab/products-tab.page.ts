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
  filteredProducts: Product[] = [];
  searchInput: string = '';
  error: string | null = null;
  environment = env;
  isLoading: boolean = true;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.filteredProducts = this.products = products;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching from products API:', error);
        this.error = 'Something went wrong. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  filterProducts() {
    const term = this.searchInput.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
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
