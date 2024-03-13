import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './button-cart.component.html',
  styleUrls: ['./button-cart.component.scss']
})
export class ButtonCartComponent {

}
