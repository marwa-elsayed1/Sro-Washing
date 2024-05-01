import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';

export const catchErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((err: HttpErrorResponse) => {
    switch (err.status) {
      case 0:
        console.log('0');
        break;
      default:
        console.log('default');
        break;
    }
    throw new Error
  }));
};
