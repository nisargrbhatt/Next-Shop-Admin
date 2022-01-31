import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpCustomerComponent } from './rp-customer.component';

describe('RpCustomerComponent', () => {
  let component: RpCustomerComponent;
  let fixture: ComponentFixture<RpCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
