import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'api/register';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    // Simulate register process
    return of({});
  }

  login(data: any): Observable<any> {
    // Simulate login process
    return of({});
  }
}
