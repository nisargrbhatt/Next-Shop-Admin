import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycDeclineComponent } from './kyc-decline.component';

describe('KycDeclineComponent', () => {
  let component: KycDeclineComponent;
  let fixture: ComponentFixture<KycDeclineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KycDeclineComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycDeclineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
