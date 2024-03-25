import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/domain/product';
import { HostUrlPipe } from 'src/app/core/pipes/host-url.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RatingComponent } from '../rating/rating.component';
import { RubPipe } from 'src/app/core/pipes/rub.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    HostUrlPipe,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    RatingComponent,
    RubPipe,
    RouterLink
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})

export class ProductCardComponent {
  @Input() product!: Product;
}
