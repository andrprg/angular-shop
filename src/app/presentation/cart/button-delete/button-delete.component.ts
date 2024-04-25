import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from 'src/app/application/cart.service';
import { ProductID } from 'src/app/domain/product';

@Component({
  selector: 'app-button-delete',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './button-delete.component.html',
  styleUrls: ['./button-delete.component.scss']
})
export class ButtonDeleteComponent {

  @Input({required: true}) productId!: ProductID;
  @Output() eventSelect = new EventEmitter<ProductID>();

  constructor(
    public cartService: CartService
  ) { }

  onRemoveProductFromCart() {
    this.eventSelect.emit(this.productId);
  }

}
