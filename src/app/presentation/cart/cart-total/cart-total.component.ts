import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/application/cart.service';
import { Observable, combineLatest, map } from 'rxjs';
import { RubPipe } from 'src/app/core/pipes/rub.pipe';
import { MatButtonModule } from '@angular/material/button';

interface  CartData {
  totalSum: number;
  countInCart: number;
}

@Component({
  selector: 'app-cart-total',
  standalone: true,
  imports: [
    CommonModule,
    RubPipe,
    MatButtonModule,
  ],
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.scss']
})
export class CartTotalComponent {

data$: Observable<CartData>;

constructor(
  public cartService: CartService
) {
  const totalSum$ = this.cartService.totalSum$;
  const countInCart$ = this.cartService.count$; 
  this.data$ = combineLatest([totalSum$, countInCart$]).pipe(
    map(([totalSum, countInCart]) => ({
      totalSum,
      countInCart
    }))
  )
}
}
