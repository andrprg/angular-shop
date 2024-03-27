import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-counter',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './product-counter.component.html',
  styleUrls: ['./product-counter.component.scss']
})
export class ProductCounterComponent {

  @Output() eventIncrement = new EventEmitter<number>();
  @Output() eventDecrement = new EventEmitter<number>();

  /**
   * Количество товара
   */
  productCount: number = 1;

  increment() {
    ++this.productCount;
    this.eventIncrement.next(this.productCount);
  }

  decrement() {
    if(this.productCount > 1) {
      --this.productCount;
      this.eventDecrement.next(this.productCount);
    } 
  }
}
