import { Injectable } from '@angular/core';
import { LoginModel } from '../../models/user-model';
import { AuthRequestService } from './request-services/auth-request.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authRequestService: AuthRequestService) {}

  doLogin(user: LoginModel) {
    return this.authRequestService.postLogin(user);
  }

  logout() {
    localStorage.clear();
    location.replace('/login');
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
