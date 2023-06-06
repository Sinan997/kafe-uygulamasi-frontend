import { Injectable } from '@angular/core';
import { loginModel } from '../models/userModel';
import { ApiRequestService } from './request-services/auth-request.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private requestService: ApiRequestService,
    private route: Router
  ) {}

  doLogin(user: loginModel) {
    return this.requestService.postLogin(user);
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['login']);
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
