import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentListTableComponent } from './payment-list-table.component';

describe('PaymentListTableComponent', () => {
  let component: PaymentListTableComponent;
  let fixture: ComponentFixture<PaymentListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentListTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
