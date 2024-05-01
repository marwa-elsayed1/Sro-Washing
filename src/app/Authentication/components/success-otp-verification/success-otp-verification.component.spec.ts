import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessOtpVerificationComponent } from './success-otp-verification.component';

describe('SuccessOtpVerificationComponent', () => {
  let component: SuccessOtpVerificationComponent;
  let fixture: ComponentFixture<SuccessOtpVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessOtpVerificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessOtpVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
