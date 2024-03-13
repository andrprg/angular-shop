import { Component, OnDestroy } from '@angular/core';
import { HeaderComponent } from './ui/layout/header/header.component';
import { FooterComponent } from './ui/layout/footer/footer.component';
import { MainComponent } from './ui/layout/main/main.component';
import { MessagesComponent } from './ui/messages/messages.component';
import { SpinnerComponent } from './ui/spinner/spinner.component';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from './repository/layout.service';
import { Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    MainComponent,
    HeaderComponent,
    FooterComponent,
    MessagesComponent,
    SpinnerComponent,
    RouterOutlet,
    FooterComponent,
    CommonModule,
  ]
})
export class AppComponent implements OnDestroy {

  /**
 * Subject для отписки
 */
  destroy$ = new Subject<boolean>();

  readonly breakpoints = Breakpoints;

  layoutType$!: Observable<string>;


  constructor(
    private layoutService: LayoutService
  ) {
    this.layoutType$ = this.layoutService.layoutType$;
    
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
