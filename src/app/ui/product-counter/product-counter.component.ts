import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Product } from 'src/app/domain/product';
import { CartService } from 'src/app/application/cart.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-product-counter',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './product-counter.component.html',
  styleUrls: ['./product-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCounterComponent {

  destroyRef = inject(DestroyRef);

  @Input({ required: true }) product!: Product;
  /**
 * Количество товара
 */
  @Input() productCount: number = 1;

  constructor(
    private cartService: CartService
  ) { }

  increment() {
    ++this.productCount;
    this.cartService.updateQuantity({
      productId: this.product.id,
      price: this.product.price,
      quantity: this.productCount
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
  }

  decrement() {
    if (this.productCount > 1) {
      --this.productCount;
      this.cartService.updateQuantity({
        productId: this.product.id,
        price: this.product.price,
        quantity: this.productCount
      }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe()
    }
  }
}
