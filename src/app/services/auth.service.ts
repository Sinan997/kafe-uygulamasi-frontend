import { Injectable } from '@angular/core';
import { loginModel } from '../models/userModel';
import { AuthRequestService } from './request-services/auth-request.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private authRequestService: AuthRequestService,
    private route: Router
  ) {}

  doLogin(user: loginModel) {
    return this.authRequestService.postLogin(user);
  }

  logout() {
    localStorage.clear();
    location.replace('/login')
  }

  isTokenExist(): boolean {
    const token = localStorage.getItem('accessToken')
      ? localStorage.getItem('accessToken')
      : null;
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('accessToken') ? true : false;
  }

  get token(): string {
    return localStorage.getItem('accessToken')!;
  }
}
