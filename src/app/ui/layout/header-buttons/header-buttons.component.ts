import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonCartComponent } from './button-cart/button-cart.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ButtonSignInOutComponent } from './button-sign-in-out/button-sign-in-out.component';
import { ButtonOrdersComponent } from './button-orders/button-orders.component';

@Component({
  selector: 'app-header-buttons',
  standalone: true,
  imports: [
    CommonModule,
    ButtonCartComponent,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    ButtonSignInOutComponent,
    ButtonOrdersComponent,
  ],
  templateUrl: './header-buttons.component.html',
  styleUrls: ['./header-buttons.component.scss']
})
export class HeaderButtonsComponent {

}
