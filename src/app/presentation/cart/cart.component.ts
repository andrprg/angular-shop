import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ProductsService } from 'src/app/repository/products.service';
import { CartService } from 'src/app/application/cart.service';
import { Observable } from 'rxjs';
import { Item } from 'src/app/domain/items';
import { SpinnerService } from 'src/app/ui/spinner/spinner.service';
import { CartItemComponent } from './cart-item/cart-item.component';
import { HostUrlPipe } from 'src/app/core/pipes/host-url.pipe';
import { ButtonDeleteComponent } from './button-delete/button-delete.component';
import { CartTotalComponent } from './cart-total/cart-total.component';
import { LayoutService } from 'src/app/repository/layout.service';
import { Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    CartItemComponent,
    CartTotalComponent
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {

  /**
   * Корзина
   */
  items$!: Observable<Item[]>;
  layoutType$!: Observable<string>;
  readonly breakpoints = Breakpoints;

  constructor(
    public cartService: CartService,
    private layoutService: LayoutService
  ) {
    this.layoutType$ = this.layoutService.layoutType$;
  }
  
  ngOnInit(): void {
    this.items$ =  this.cartService.items$;       
   }
  }
