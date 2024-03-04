import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerService } from 'src/app/ui/spinner/spinner.service';
import { AuthService } from 'src/app/repository/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/ui/messages/messages.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent {

  /**
   * Субъект отписки
   */
  destroy$ = new Subject<boolean>();

  form = this.fb.group({
    email: ["test@test.ru", {
      validators: [Validators.required, Validators.email]
    }],
    password: ['test', [Validators.required, Validators.minLength(4)]]
  });

  constructor(
    private fb: FormBuilder,
    private spinnerService: SpinnerService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessagesService
  ) { }

  /**
   * Авторизация
   */
  login(): void {
    const { email, password } = this.form.value;
    const auth$ = this.authService.login(email!, password!);
    this.spinnerService.showLoaderUntilCompleted(auth$).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: user => this.router.navigate(['/home']),
      error: error => this.messageService.showErrors(error.error.message)
    }
    );
  }
}
