import { Routes } from '@angular/router';

import { LoginComponent } from './Authentication/components/login/login.component';
import { RegisterComponent } from './Authentication/components/register/register.component';
import { OtpVerificationComponent } from './Authentication/components/otp-verification/otp-verification.component';
import { SuccessOtpVerificationComponent } from './Authentication/components/success-otp-verification/success-otp-verification.component';
import { HomeComponent } from './Core/components/home/home.component';
import { ContactUsComponent } from './Core/components/contact-us/contact-us.component';
import { authGuard } from './Authentication/guards/auth.guard';
import { isLoggedInGuard } from './Authentication/guards/is-logged-in.guard';
import { ReservationComponent } from './Core/components/reservation/reservation.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    {
        path: "auth",
        canActivate: [isLoggedInGuard],
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'otp-verification', component: OtpVerificationComponent },
            { path: 'success-otp', component: SuccessOtpVerificationComponent },
        ]
    },
    {
        path: 'home',
        // canActivate: [authGuard],
        component: HomeComponent
    },
    {
        path: 'service/:id/reservation',
        // canActivate: [authGuard],
        component: ReservationComponent
    },
    {
        path: 'contact',
        component: ContactUsComponent
    }
];
