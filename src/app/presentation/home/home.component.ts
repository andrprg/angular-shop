import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from 'src/app/ui/spinner/spinner.service';
import { ProductsService } from 'src/app/repository/products.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/domain/product';
import { MatCardModule } from '@angular/material/card';
import { HostUrlPipe } from 'src/app/core/pipes/host-url.pipe';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RatingComponent } from 'src/app/ui/rating/rating.component';
import { RubPipe } from 'src/app/core/pipes/rub.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    HostUrlPipe,
    MatDividerModule,
    MatIconModule,
    RatingComponent,
    RubPipe
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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
}
