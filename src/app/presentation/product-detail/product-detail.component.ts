import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/domain/product';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/repository/products.service';
import { SpinnerService } from 'src/app/ui/spinner/spinner.service';
import { HostUrlPipe } from 'src/app/core/pipes/host-url.pipe';
import { LayoutService } from 'src/app/repository/layout.service';
import { Breakpoints } from '@angular/cdk/layout';
import { RatingComponent } from 'src/app/ui/rating/rating.component';
import { RubPipe } from 'src/app/core/pipes/rub.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { ProductCounterComponent } from 'src/app/ui/product-counter/product-counter.component';
import { MatButtonModule } from '@angular/material/button';
import { Item } from 'src/app/domain/items';
import { CartService } from 'src/app/application/cart.service';
import { inputIsNotNullOrUndefined } from 'src/app/core/helper';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    HostUrlPipe,
    AsyncPipe,
    RatingComponent,
    RubPipe,
    MatDividerModule,
    ProductCounterComponent,
    MatButtonModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {

  product$: Observable<Product>;
  readonly breakpoints = Breakpoints;
  layoutType$!: Observable<string>;

  item: Item;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private spinnerService: SpinnerService,
    private layoutService: LayoutService,
    private cartService: CartService,
    private router: Router
  ) {
    const id = this.activatedRoute.snapshot.params['id'];
    const product = this.productsService.getProductById(id);
    this.product$ = this.spinnerService.showLoaderUntilCompleted(product);

    this.layoutType$ = this.layoutService.layoutType$;

    this.item = {
      productId: id,
      quantity: 1
    }
  }

  /**
   * Изменение количества в корзине
   * @param $event 
   */
  onChangeQuantity($event: number) {    
    this.item = {
      ...this.item,
      quantity: $event
    };
  }

  onAddToCart() {
    this.cartService.addToCart(this.item);
    this.router.navigate(['/home']);
  }

}
