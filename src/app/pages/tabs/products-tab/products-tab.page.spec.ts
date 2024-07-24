import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { ProductsTabPage } from './products-tab.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ProductsTabConstants } from 'src/app/constants/products-tab-constants';
import { ProductSortType } from 'src/app/enums/product-sort-type.enum';
import { PriceUtil } from 'src/app/utils/price-util';
import { Router } from '@angular/router';

describe('ProductsTabPage', () => {
  let component: ProductsTabPage;
  let fixture: ComponentFixture<ProductsTabPage>;
  let productService: ProductService;
  let priceUtilSpy: jasmine.SpyObj<PriceUtil>;
  let routerSpy: jasmine.SpyObj<Router>;
  
  beforeEach(async () => {
    const priceUtilSpy = jasmine.createSpyObj('PriceUtil', ['calculateDiscountedPrice']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [ProductsTabPage],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        IonicModule.forRoot(),
        FormsModule 
      ],
      providers: [
        ProductService,
        DomSanitizer,
        { provide: PriceUtil, useValue: priceUtilSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsTabPage);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    priceUtilSpy = TestBed.inject(PriceUtil) as jasmine.SpyObj<PriceUtil>;
    fixture.detectChanges();
  });

  const mockProducts = [
    { id: 1, name: 'A Product 1', price: 100, description: 'Description 1', discount: 10 },
    { id: 2, name: 'B Product 2', price: 200, description: 'Another Description', discount: 20 },
    { id: 3, name: 'Test', price: 300, description: 'Test Description', discount: 30 }
  ];

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call products API successfully and return mockProducts', () => {
    spyOn(productService, 'getProducts').and.returnValue(of(mockProducts));
    component.getProducts();
    expect(component.products).toEqual(mockProducts);
    expect(component.filteredProducts).toEqual(mockProducts);
    expect(component.isLoading).toBeFalse();
    expect(component.error).toBe(null);
  });

  it('should handle error when calling products API and throw error', () => {
    spyOn(productService, 'getProducts').and.returnValue(throwError('error'));
    component.getProducts();
    expect(component.products).toEqual([]);
    expect(component.filteredProducts).toEqual([]);
    expect(component.isLoading).toBeFalse();
    expect(component.error).toBe(ProductsTabConstants.API_ERROR);
  });

  it('should filter product list based on search input', () => {
    component.searchInput = 'Product';
    component.products = mockProducts;
    component.filteredProducts = mockProducts;
    component.filterProducts();
    expect(component.filteredProducts.length).toBe(2);
    expect(component.filteredProducts).toEqual([
      mockProducts[0], 
      mockProducts[1]
    ]);

    component.searchInput = 'Another';
    component.filterProducts();
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts).toEqual([mockProducts[1]]);

    component.searchInput = 'Test';
    component.filterProducts();
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts).toEqual([mockProducts[2]]);

    component.searchInput = 'Nothing';
    component.filterProducts();
    expect(component.filteredProducts.length).toBe(0);
  });

  it('should sort products by price ascending', () => {
    component.filteredProducts = component.products = mockProducts;
    component.sortOrder = ProductSortType.PRICEASC;
    component.sortProducts();
    expect(component.filteredProducts).toEqual([
      { id: 1, name: 'A Product 1', price: 100, description: 'Description 1', discount: 10 },
      { id: 2, name: 'B Product 2', price: 200, description: 'Another Description', discount: 20 },
      { id: 3, name: 'Test', price: 300, description: 'Test Description', discount: 30 }
    ]);
  });

  it('should sort products by price descending', () => {
    component.filteredProducts = component.products = mockProducts;
    component.sortOrder = ProductSortType.PRICEDESC;
    component.sortProducts();
    expect(component.filteredProducts).toEqual([
      { id: 3, name: 'Test', price: 300, description: 'Test Description', discount: 30 },
      { id: 2, name: 'B Product 2', price: 200, description: 'Another Description', discount: 20 },
      { id: 1, name: 'A Product 1', price: 100, description: 'Description 1', discount: 10 }
    ]);
  });

  it('should sort products by name ascending', () => {
    component.filteredProducts = component.products = mockProducts;
    component.sortOrder = ProductSortType.NAMEASC;
    component.sortProducts();
    expect(component.filteredProducts).toEqual([
      { id: 1, name: 'A Product 1', price: 100, description: 'Description 1', discount: 10 },
      { id: 2, name: 'B Product 2', price: 200, description: 'Another Description', discount: 20 },
      { id: 3, name: 'Test', price: 300, description: 'Test Description', discount: 30 }
    ]);
  });

  it('should sort products by name descending', () => {
    component.filteredProducts = component.products = mockProducts;
    component.sortOrder = ProductSortType.NAMEDESC;
    component.sortProducts();
    expect(component.filteredProducts).toEqual([
      { id: 3, name: 'Test', price: 300, description: 'Test Description', discount: 30 },
      { id: 2, name: 'B Product 2', price: 200, description: 'Another Description', discount: 20 },
      { id: 1, name: 'A Product 1', price: 100, description: 'Description 1', discount: 10 }
    ]);
  });

  it('should calculate discounted price', () => {
    const expectedDiscountedPrice = 90;
    priceUtilSpy.calculateDiscountedPrice.and.returnValue(expectedDiscountedPrice);
    const result = component.calculateDiscountedPrice(mockProducts[0]);
    expect(result).toBe(expectedDiscountedPrice);
    expect(priceUtilSpy.calculateDiscountedPrice).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('should navigate to product detail with product data', () => {
    component.viewProductDetail(mockProducts[0]);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/product-detail'], { state: { product: mockProducts[0] } });
  });
});
