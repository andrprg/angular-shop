import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCartComponent } from './button-cart.component';

describe('ButtonCartComponent', () => {
  let component: ButtonCartComponent;
  let fixture: ComponentFixture<ButtonCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonCartComponent]
    });
    fixture = TestBed.createComponent(ButtonCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
