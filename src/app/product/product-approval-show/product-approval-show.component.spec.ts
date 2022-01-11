import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductApprovalShowComponent } from './product-approval-show.component';

describe('ProductApprovalShowComponent', () => {
  let component: ProductApprovalShowComponent;
  let fixture: ComponentFixture<ProductApprovalShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductApprovalShowComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductApprovalShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
