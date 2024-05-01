import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../services/auth.service';
import { GeneralResponse } from '../../interfaces/generalResponse';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, ToastModule],
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.scss'
})
export class OtpVerificationComponent implements OnInit, OnDestroy {
  verificationCode = '';

  otpForm!: FormGroup;
  otpSubscription!: Subscription;
  resendOtpSubscription!: Subscription;

  constructor(private _FormBuilder: FormBuilder,
    private _MessageService: MessageService,
    private _AuthService: AuthService,
    private _Router: Router) { }

  ngOnInit(): void {
    this.fb();
  }

  fb() {
    this.otpForm = this._FormBuilder.group({
      otpOne: ['', [Validators.required, Validators.minLength(1)]],
      otpTwo: ['', [Validators.required, Validators.minLength(1)]],
      otpThree: ['', [Validators.required, Validators.minLength(1)]],
      otpFour: ['', [Validators.required, Validators.minLength(1)]],
      otpFive: ['', [Validators.required, Validators.minLength(1)]],
      otpSix: ['', [Validators.required, Validators.minLength(1)]],

    },
    )
  }


  resendOtp(){
    const resendInfo = {
      phoneNumber : sessionStorage.getItem("phoneNumber"),
    }

    this.resendOtpSubscription = this._AuthService.resendOTP(resendInfo).subscribe({
      next: (respone: GeneralResponse) => {
        if (respone.success) {
          this._MessageService.clear();
          this._MessageService.add({ severity: 'success', summary: 'Success', detail: `${respone.message}`, life: 4000 });
        } else {
          this._MessageService.clear();
          this._MessageService.add({ severity: 'error', summary: 'Error', detail: `${respone.message}`, life: 4000 });
        }
      },
      error: (error: GeneralResponse) => {
        this._MessageService.clear();
        this._MessageService.add({ severity: 'error', summary: 'Error', detail: `${error.message}`, life: 4000 });
      }
    })
  }

  onSubmit() {
    if (this.otpForm.invalid) {
      this._MessageService.clear();
      this._MessageService.add({ severity: 'error', summary: 'Error', detail: 'Form is invalid.', life: 4000 });
      return;
    }

    var otpString = this.otpForm.controls["otpOne"].value
    .concat(this.otpForm.controls["otpTwo"].value)
    .concat(this.otpForm.controls["otpThree"].value)
    .concat(this.otpForm.controls["otpFour"].value)
    .concat(this.otpForm.controls["otpFive"].value)
    .concat(this.otpForm.controls["otpSix"].value);
   
    // console.log(otpString);
    const userInfo = {
      otp : otpString,
      phoneNumber : sessionStorage.getItem("phoneNumber"),
    }
    this.otpSubscription = this._AuthService.confirmOTP(userInfo).subscribe({
      next: (respone: GeneralResponse) => {
        if (respone.success) {
          this._Router.navigate(['/auth/success-otp']);
        } else {
          this._MessageService.clear();
          this._MessageService.add({ severity: 'error', summary: 'Error', detail: `${respone.message}`, life: 4000 });
        }
      },
      error: (error: GeneralResponse) => {
        this._MessageService.clear();
        this._MessageService.add({ severity: 'error', summary: 'Error', detail: `${error.message}`, life: 4000 });
      }
    })

  }


  ngOnDestroy(): void {
    this.otpSubscription.unsubscribe();
    this.resendOtpSubscription.unsubscribe();

  }
}
