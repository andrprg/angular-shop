import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/application/cart.service';
import { Observable } from 'rxjs';
import { RubPipe } from 'src/app/core/pipes/rub.pipe';
import { MatButtonModule } from '@angular/material/button';

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

totalSum$: Observable<number>;

constructor(
  public cartService: CartService
) {
  this.totalSum$ = this.cartService.totalSum$;
}
}
