import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from 'src/app/ui/spinner/spinner.service';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

  constructor(
    private spinnerService: SpinnerService
  ) {
    this.spinnerService.loadingOff();
  }
}
