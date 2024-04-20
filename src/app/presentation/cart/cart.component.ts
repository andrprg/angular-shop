import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ProductsService } from 'src/app/repository/products.service';
import { CartService } from 'src/app/application/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    public productService: ProductsService,
    public cartService: CartService
  ) {}
  
  ngOnInit(): void {
    this.cartService.items$.subscribe(data => {
      console.log('remote:', data);
    });
  }

  
}
