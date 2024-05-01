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
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, ToastModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup;
  registerSubscription!: Subscription;

  constructor(private _FormBuilder: FormBuilder,
    private _MessageService: MessageService,
    private _AuthService: AuthService,
    private _Router: Router) { }

  ngOnInit(): void {
    this.fb();
  }

  fb() {
    this.registerForm = this._FormBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    },
      { validator: this.validateAreEqual('password', 'confirmPassword') }
    )
  }

  validateAreEqual(pass: string, confimPass: string) {
    return (group: FormGroup) => {
      const password = group.controls[pass];
      const confimPassword = group.controls[confimPass];
      if (password.value !== confimPassword.value) {
        confimPassword.setErrors({ passwordMismatch: true });
      } else {
        confimPassword.setErrors(null);
      }
    };
  }


  onSubmit() {
    if (this.registerForm.invalid) {
      this._MessageService.clear();
      this._MessageService.add({ severity: 'error', summary: 'Error', detail: 'Form is invalid.', life: 4000 });
      return;
    }

    this.registerSubscription = this._AuthService.register(this.registerForm.value).subscribe({
      next: (respone: GeneralResponse) => {
        if (respone.success) {
          this._Router.navigate(['/auth/otp-verification']);
          sessionStorage.setItem('phoneNumber', this.registerForm.controls['phoneNumber'].value);
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
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }
}
