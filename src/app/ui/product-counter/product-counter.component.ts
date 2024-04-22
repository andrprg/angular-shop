import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Product } from 'src/app/domain/product';

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

  @Input({required: true}) product?: Product | null;
  @Output() eventQuantity = new EventEmitter<number>();
  
  /**
   * Количество товара
   */
  productCount: number = 1;

  increment() {
    ++this.productCount;
    this.eventQuantity.next(this.productCount);
  }

  decrement() {
    if(this.productCount > 1) {
      --this.productCount;
      this.eventQuantity.next(this.productCount);
    } 
  }
}
