import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../interfaces/product';
import { API_PATHS } from '../constants/config/api-paths';

describe('ProductService', () => {
    let service: ProductService;
    let httpMock: HttpTestingController;

    const mockProducts: Product[] = [
        { id: 1, name: 'Product 1', price: 100, description: 'Description 1', discount: 10 },
        { id: 2, name: 'Product 2', price: 150, description: 'Description 2', discount: 5 }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductService]
        });

        service = TestBed.inject(ProductService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getProducts', () => {
        it('should get all products from API', () => {
            service.getProducts().subscribe(products => {
                expect(products.length).toBe(2);
                expect(products).toEqual(mockProducts);
            });

            const req = httpMock.expectOne(API_PATHS.products);
            expect(req.request.method).toBe('GET');
            req.flush(mockProducts);
        });

        it('should handle API errors', () => {
            service.getProducts().subscribe({
                next: () => fail('expected an error, not products'),
                error: (error) => {
                    expect(error.status).toBe(500);
                    expect(error.statusText).toBe('Server Error');
                }
            });

            const req = httpMock.expectOne(API_PATHS.products);
            req.flush('Something went wrong', { status: 500, statusText: 'Server Error' });
        });
    });
});