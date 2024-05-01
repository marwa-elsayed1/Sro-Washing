import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private _HttpClient: HttpClient) { }

  getAllServices(): Observable<any[]> {
    return this._HttpClient.get<any[]>(`${environment.BaseURL}/api/Service/GetAllService`,
      { responseType: 'json' })
  }
}
