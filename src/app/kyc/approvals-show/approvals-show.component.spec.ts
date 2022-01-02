import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalsShowComponent } from './approvals-show.component';

describe('ApprovalsShowComponent', () => {
  let component: ApprovalsShowComponent;
  let fixture: ComponentFixture<ApprovalsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalsShowComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
