import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/repository/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button-sign-in-out',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './button-sign-in-out.component.html',
  styleUrls: ['./button-sign-in-out.component.scss']
})
export class ButtonSignInOutComponent {

  constructor(
    public auth: AuthService
  ) { }

  logout() {
    this.auth.logout();
  }
}
