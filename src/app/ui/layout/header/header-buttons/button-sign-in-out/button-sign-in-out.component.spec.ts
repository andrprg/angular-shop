import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSignInOutComponent } from './button-sign-in-out.component';

describe('ButtonSignInOutComponent', () => {
  let component: ButtonSignInOutComponent;
  let fixture: ComponentFixture<ButtonSignInOutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonSignInOutComponent]
    });
    fixture = TestBed.createComponent(ButtonSignInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
