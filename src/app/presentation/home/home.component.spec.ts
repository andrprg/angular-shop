import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from 'src/app/repository/products.service';
import { SpinnerService } from 'src/app/ui/spinner/spinner.service';
import { of } from 'rxjs/internal/observable/of';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;

  beforeEach(() => {
    productsServiceSpy = jasmine.createSpyObj('ProductsService', {
      getProducts: of([])
    })
    TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule],
      providers: [
        SpinnerService,
      {
        provide: ProductsService, userValue: productsServiceSpy
      }
     ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
