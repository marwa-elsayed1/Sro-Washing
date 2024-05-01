import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {

  const token = inject(AuthService).getToken();

  if (token) {
    inject(Router).navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
