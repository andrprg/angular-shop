import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from 'src/app/repository/products.service';
import { Product, ProductID } from 'src/app/domain/product';
import { Item } from 'src/app/domain/items';
import { Observable } from 'rxjs';
import { SpinnerService } from 'src/app/ui/spinner/spinner.service';
import { HostUrlPipe } from 'src/app/core/pipes/host-url.pipe';
import { ProductCounterComponent } from 'src/app/ui/product-counter/product-counter.component';
import { ButtonDeleteComponent } from '../button-delete/button-delete.component';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from 'src/app/application/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    CommonModule,
    HostUrlPipe,
    ProductCounterComponent,
    ButtonDeleteComponent,
  ],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input({required: true}) item!: Item
  product$!: Observable<Product>;

  constructor(
    public productService: ProductsService,
    private spinnerService: SpinnerService, 
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    const products = this.productService.getProductById(this.item.productId);
    this.product$ = this.spinnerService.showLoaderUntilCompleted(products);
  }

  onChangeQuantity(event: number) {}

  onRemoveProductFromCart(productId: ProductID) {
    this.cartService.deleteItem(this.item);
  }

}
