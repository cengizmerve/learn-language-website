// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserProgress} from "../models/user-progress.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://your-backend-url/api/user-progress';

  constructor(private http: HttpClient) { }

  getUserProgress(): Observable<UserProgress[]> {
    return this.http.get<UserProgress[]>(this.apiUrl);
  }
}
