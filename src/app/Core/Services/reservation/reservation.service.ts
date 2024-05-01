import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private _HttpClient: HttpClient) { }

  getAvailableTimes(date: string, serviceId: string): Observable<any[]> {
    return this._HttpClient.get<any[]>(`${environment.BaseURL}/api/Reservations/available-time?ServiceId=${serviceId}&Date=${date}`,
      { responseType: 'json' })
  }
}
