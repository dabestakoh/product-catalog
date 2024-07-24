import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProductDetailConstants } from 'src/app/constants/product-detail.constants';
import { AppRoutes } from 'src/app/enums/app-routes.enum';
import { AppState } from 'src/app/enums/app-state';
import { Product } from 'src/app/interfaces/product';
import { PriceUtil } from 'src/app/utils/price-util';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product: Product | undefined;
  environment = env;
  productDetailConstants = ProductDetailConstants;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private priceUtil: PriceUtil) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();

    // gets the state and assign to product: Product object
    if (navigation?.extras.state && navigation.extras.state[AppState.PRODUCT]) {
      this.product = navigation.extras.state[AppState.PRODUCT];
    } else {
      this.router.navigate([AppRoutes.PRODUCTS]);
    }
  }

  // calculates discounted price from priceUtil and returns it to display
  calculateDiscountedPrice(product: Product): number {
    return this.priceUtil.calculateDiscountedPrice(product);
  }

  // navigate back using the chevron icon to products page
  navigateToProducts() {
    this.navCtrl.navigateBack(AppRoutes.PRODUCTS);
  }
}
