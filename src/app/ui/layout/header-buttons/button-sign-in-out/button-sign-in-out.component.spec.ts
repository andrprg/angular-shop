import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSignInOutComponent } from './button-sign-in-out.component';
import { AuthService } from 'src/app/repository/auth.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ButtonSignInOutComponent', () => {
  let component: ButtonSignInOutComponent;
  let fixture: ComponentFixture<ButtonSignInOutComponent>;
  let authSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authSpy = jasmine.createSpyObj('AuthService', {
      isLoggedOut$: of(true),
      isLoggedIn$: of(false),
    })
    TestBed.configureTestingModule({
      imports: [ButtonSignInOutComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provider: AuthService, useValue: authSpy}
      ]
    });
    fixture = TestBed.createComponent(ButtonSignInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
