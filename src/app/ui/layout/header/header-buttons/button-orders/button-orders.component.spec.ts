import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonOrdersComponent } from './button-orders.component';

describe('ButtonOrdersComponent', () => {
  let component: ButtonOrdersComponent;
  let fixture: ComponentFixture<ButtonOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonOrdersComponent]
    });
    fixture = TestBed.createComponent(ButtonOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
