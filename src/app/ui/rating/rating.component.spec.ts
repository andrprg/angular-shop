import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingComponent } from './rating.component';
import { Product } from 'src/app/domain/product';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RatingComponent]
    });
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    component.product = {avgRating: 0} as Product;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
