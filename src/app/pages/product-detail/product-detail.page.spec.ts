import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AppRoutes } from 'src/app/enums/app-routes.enum';
import { AppState } from 'src/app/enums/app-state';
import { Product } from 'src/app/interfaces/product';
import { PriceUtil } from 'src/app/utils/price-util';
import { ProductDetailPage } from './product-detail.page';

describe('ProductDetailPage', () => {
  let component: ProductDetailPage;
  let fixture: ComponentFixture<ProductDetailPage>;
  let routerSpy: jasmine.SpyObj<Router>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;
  let priceUtilSpy: jasmine.SpyObj<PriceUtil>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'getCurrentNavigation']);
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateBack']);
    priceUtilSpy = jasmine.createSpyObj('PriceUtil', ['calculateDiscountedPrice']);

    await TestBed.configureTestingModule({
      declarations: [ProductDetailPage],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: NavController, useValue: navCtrlSpy },
        { provide: PriceUtil, useValue: priceUtilSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const mockProduct: Product = { id: 1, name: 'Product 1', price: 100, description: 'Description 1', discount: 10 };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set product from navigation state if present', () => {
    routerSpy.getCurrentNavigation.and.returnValue({
      extras: {
        state: {
          [AppState.PRODUCT]: mockProduct
        }
      }
    } as any);

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.product).toEqual(mockProduct);
    expect(routerSpy.navigate).toHaveBeenCalled();
  });

  it('should navigate to products page if no product in navigation state', () => {
    routerSpy.getCurrentNavigation.and.returnValue({
      extras: {
        state: {}
      }
    } as any);

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.product).toBeUndefined();
    expect(routerSpy.navigate).toHaveBeenCalledWith([AppRoutes.PRODUCTS]);
  });

  it('should navigate to products page if navigation is null', () => {
    routerSpy.getCurrentNavigation.and.returnValue(null);

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.product).toBeUndefined();
    expect(routerSpy.navigate).toHaveBeenCalledWith([AppRoutes.PRODUCTS]);
  });

  it('should calculate discounted price', () => {
    const expectedDiscountedPrice = 90;
    priceUtilSpy.calculateDiscountedPrice.and.returnValue(expectedDiscountedPrice);
    const result = component.calculateDiscountedPrice(mockProduct);
    expect(result).toBe(expectedDiscountedPrice);
    expect(priceUtilSpy.calculateDiscountedPrice).toHaveBeenCalledWith(mockProduct);
  });

  it('should navigate back to products page', () => {
    component.navigateToProducts();
    expect(navCtrlSpy.navigateBack).toHaveBeenCalledWith(AppRoutes.PRODUCTS);
  });
});
