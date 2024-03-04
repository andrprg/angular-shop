import { Component, OnDestroy } from '@angular/core';
import { HeaderComponent } from './ui/layout/header/header.component';
import { FooterComponent } from './ui/layout/footer/footer.component';
import { MainComponent } from './ui/layout/main/main.component';
import { MessagesComponent } from './ui/messages/messages.component';
import { SpinnerComponent } from './ui/spinner/spinner.component';
import { AuthService } from './repository/auth.service';
import { Subject, filter, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

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
    SpinnerComponent
  ]
})
export class AppComponent implements OnDestroy {

    /**
   * Subject для отписки
   */
    destroy$ = new Subject<boolean>();


  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.isLoggedOut$.pipe(
      filter(isLogged => isLogged),
      takeUntil(this.destroy$)
    ).subscribe({
      next: _ => {
        this.router.navigate(['/login']);
      },
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
