import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInStatus = false;


  constructor(
  ) {
    const storedStatus = localStorage.getItem('loggedInStatus');
    this.loggedInStatus = storedStatus === 'true';
  }

  login() {
    this.loggedInStatus = true;
    localStorage.setItem('loggedInStatus ', 'true');
  }

  isLoggedIn(): boolean {
    return this.loggedInStatus;
  }

}

