import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpOrderComponent } from './rp-order.component';

describe('RpOrderComponent', () => {
  let component: RpOrderComponent;
  let fixture: ComponentFixture<RpOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RpOrderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
