import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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

  product$!: Observable<Product>;
  readonly breakpoints = Breakpoints;
  layoutType$!: Observable<string>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private spinnerService: SpinnerService,
    private layoutService: LayoutService,
  ) {
    const id = this.activatedRoute.snapshot.params['id'];
    const product = this.productsService.getProductById(id);
    this.product$ = this.spinnerService.showLoaderUntilCompleted(product);

    this.layoutType$ = this.layoutService.layoutType$;
  }
}
