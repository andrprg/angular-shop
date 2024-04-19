import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from 'src/app/application/cart.service';
import { Observable, map } from 'rxjs';
import {MatBadgeModule} from '@angular/material/badge';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    RouterLink
  ],
  templateUrl: './button-cart.component.html',
  styleUrls: ['./button-cart.component.scss']
})
export class ButtonCartComponent {

  total$: Observable<number>;

  constructor(
    public cartService: CartService
  ) {
    this.total$ = this.cartService.items$.pipe(map(items => items.length));
  }
}
