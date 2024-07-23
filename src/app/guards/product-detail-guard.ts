import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    if (state && state['product']) {
      return true;
    }
    this.router.navigate(['/products']);
    return false;
  }
}