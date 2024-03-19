import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from 'src/app/ui/spinner/spinner.service';
import { ProductsService } from 'src/app/repository/products.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/domain/product';
import { ProductCardComponent } from 'src/app/ui/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  products$!: Observable<Product[]>;

  constructor(
    private spinnerService: SpinnerService,
    public productsService: ProductsService,
  ) {    
  }

  ngOnInit(): void {
    const products = this.productsService.getProducts();
    this.products$ = this.spinnerService.showLoaderUntilCompleted(products);
  }

  trackByFn(index: number, product: Product): string {
    return product.id;
  }
}
