import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpPaymentComponent } from './rp-payment.component';

describe('RpPaymentComponent', () => {
  let component: RpPaymentComponent;
  let fixture: ComponentFixture<RpPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RpPaymentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
