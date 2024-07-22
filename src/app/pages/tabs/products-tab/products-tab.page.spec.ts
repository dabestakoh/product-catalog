import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsTabPage } from './products-tab.page';

describe('ProductsTabPage', () => {
  let component: ProductsTabPage;
  let fixture: ComponentFixture<ProductsTabPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
