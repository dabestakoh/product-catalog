import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Product } from 'src/app/interfaces/product';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  product: Product | undefined;
  environment = env;
  constructor(
    private router: Router,
    private navCtrl: NavController) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['product']) {
      this.product = navigation.extras.state['product'];
    } else {
      this.router.navigate(['/products']);
    }
  }

  calculateDiscountedPrice(product: Product): number {
    if (product.discount > 0) {
      return product.price - (product.price * (product.discount / 100));
    }
    return product.price;
  }

  navigateToProducts() {
    this.navCtrl.navigateBack('tabs/products')
  }
}
