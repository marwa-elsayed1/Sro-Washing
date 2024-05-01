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
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loginSubscription!: Subscription;

  constructor(private _FormBuilder: FormBuilder,
    private _MessageService: MessageService,
    private _AuthService: AuthService,
    private _Router: Router) { }

  ngOnInit(): void {
    this.fb();
  }

  fb() {
    this.loginForm = this._FormBuilder.group({
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    },
    )
  }

  onSubmit() {
    console.log(this.loginForm.value);
    
    if (this.loginForm.invalid) {
      this._MessageService.clear();
      this._MessageService.add({ severity: 'error', summary: 'Error', detail: 'Form is invalid.', life: 4000 });
      return;
    }

    this.loginSubscription = this._AuthService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        localStorage.setItem('auth-user-srosh', JSON.stringify(response));
        this._AuthService.saveToken(response.token)
        this._Router.navigate(['/home']);
      },
      error: (error: any) => {
        this._MessageService.clear();
        this._MessageService.add({ severity: 'error', summary: 'Error', detail: `${error.error.message}`, life: 4000 });
      }
    })

  }


  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

}
