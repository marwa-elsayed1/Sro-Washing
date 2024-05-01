import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loader$: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);

  setLoader(): void {
    this.loader$.next(!this.loader$.value);
    console.log(this.loader$.value);

  }

  getLoader(): Observable<Boolean> {
    return this.loader$;
  }
}
