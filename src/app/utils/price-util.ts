import { Injectable } from "@angular/core";
import { Product } from "../interfaces/product";

@Injectable({
    providedIn: 'root'
})
export class PriceUtil {

    calculateDiscountedPrice(product: Product): number {
        if (product.discount > 0) {
            return product.price - (product.price * (product.discount / 100));
        }
        return product.price;
    }
}