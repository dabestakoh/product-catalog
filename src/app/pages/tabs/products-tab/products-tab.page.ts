import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsTabConstants } from 'src/app/constants/products-tab-constants';
import { ProductSortType } from 'src/app/enums/product-sort-type.enum';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { PriceUtil } from 'src/app/utils/price-util';
import { environment as env } from 'src/environments/environment';
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
  sortOrder: string = ProductSortType.PRICEASC;
  productsTabConstants = ProductsTabConstants;
  productSortType = ProductSortType;

  constructor(
    private productService: ProductService,
    private router: Router,
    private priceUtil: PriceUtil) { }

  ngOnInit() {
    // get the products list on load
    this.getProducts();
  }

  // call the products API to get the products, display an error if there is any error in the reponse
  getProducts(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.filteredProducts = this.products = products;
        this.isLoading = false;
      },
      (error: any) => {
        this.error = this.productsTabConstants.API_ERROR;
        this.isLoading = false;
      }
    );
  }

  // filters the current products array to display updated product list based on search input
  filterProducts() {
    const term = this.searchInput.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(term)
    );
  }

  // sorts the product list by productSortType
  sortProducts() {
    switch (this.sortOrder) {
      case this.productSortType.PRICEASC:
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case this.productSortType.PRICEDESC:
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case this.productSortType.NAMEASC:
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case this.productSortType.NAMEDESC:
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
  }

  // calculates discounted price from priceUtil and returns it to display
  calculateDiscountedPrice(product: Product): number {
    return this.priceUtil.calculateDiscountedPrice(product);
  }

  // navaigates to product detail page and passes the state of the current product clicked
  viewProductDetail(product: Product) {
    this.router.navigate(['/product-detail'], { state: { product } });
  }
}
