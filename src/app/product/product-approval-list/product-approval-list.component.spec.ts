import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductApprovalListComponent } from './product-approval-list.component';

describe('ProductApprovalListComponent', () => {
  let component: ProductApprovalListComponent;
  let fixture: ComponentFixture<ProductApprovalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductApprovalListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
