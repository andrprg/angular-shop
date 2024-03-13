import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './button-orders.component.html',
  styleUrls: ['./button-orders.component.scss']
})
export class ButtonOrdersComponent {

}
