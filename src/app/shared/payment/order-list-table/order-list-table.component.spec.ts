import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListTableComponent } from './order-list-table.component';

describe('OrderListTableComponent', () => {
  let component: OrderListTableComponent;
  let fixture: ComponentFixture<OrderListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
