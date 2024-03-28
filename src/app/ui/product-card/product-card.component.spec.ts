import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { provideRouter } from '@angular/router';
import { ProductDetailComponent } from 'src/app/presentation/product-detail/product-detail.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  const product = {
    id: '1',
    imageUrl: 'assets/products/bruschetta-plate.jpg',
    title: 'Bruschetta plate',
    description: 'Lorem ipsum',
    price: 15,
    availableQuantity: 5,
    avgRating: 4.5,
    numRatings: 5,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [
        provideRouter([
          { path: 'product/:id', component: ProductDetailComponent }
        ]),
      ]
    });
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.product = product;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
