import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../interfaces/User';
import { GeneralResponse } from '../interfaces/generalResponse';
import { environment } from '../../../environment/environment.prod';


const TOKEN_KEY = 'auth-token-srosh';
const USER_KEY = 'auth-user-srosh';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  mainPath!: string;
  user$: BehaviorSubject<User> = new BehaviorSubject<User>({
    fullName: '',
    phoneNumber: '',
    token: '',
    exp: new Date()
  });

  constructor(private _HttpClient: HttpClient) {
    this.mainPath = "/api/Authentication";
  }

  register(userData: { fullName: string, phoneNumber: string, password: string, confirmPassword: string }): Observable<GeneralResponse> {
    return this._HttpClient.post<GeneralResponse>(`${environment.BaseURL + this.mainPath}/Register`, userData);
  }

  confirmOTP(userData: { otp: string, phoneNumber: string | null }): Observable<GeneralResponse> {
    return this._HttpClient.post<GeneralResponse>(`${environment.BaseURL + this.mainPath}/ConfirmOtp`, userData);
  }

  resendOTP(userData: { phoneNumber: string | null }): Observable<GeneralResponse> {
    return this._HttpClient.post<GeneralResponse>(`${environment.BaseURL + this.mainPath}/ReSendOTP`, userData);
  }

  login(userData: { phoneNumber: string, password: string }): Observable<GeneralResponse> {
    return this._HttpClient.post<GeneralResponse>(`${environment.BaseURL + this.mainPath}/LogIn`, userData);
  }

  saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  checkCurrentUser() {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = localStorage.getItem(USER_KEY);
    if (token && user) {
      this.setCurrenUser(JSON.parse(user));
      return true;
    } else {
      this.user$.next({
        fullName: '',
        phoneNumber: '',
        token: '',
        exp: new Date()
      })
      return false;
    }
  }

  private setCurrenUser(userData: User) {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    this.user$.next(userData);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
}
