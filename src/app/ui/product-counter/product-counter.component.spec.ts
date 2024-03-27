import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCounterComponent } from './product-counter.component';

describe('ProductCounterComponent', () => {
  let component: ProductCounterComponent;
  let fixture: ComponentFixture<ProductCounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductCounterComponent]
    });
    fixture = TestBed.createComponent(ProductCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
