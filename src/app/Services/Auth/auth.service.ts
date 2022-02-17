import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  currentUser: string;
  public isAuthenticated(): boolean {
    const logined = JSON.parse(localStorage.getItem('userStatus')).loginStatus;
    return logined;
  }
}
