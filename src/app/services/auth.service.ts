import { Injectable } from '@angular/core';
import { User } from '../models/userModel';
import jwt_decode from 'jwt-decode';
import { ApiRequestService } from './api-request.service';
import { loginResponse } from '../models/apiModels/loginResponse';
import { errorResponse } from '../models/apiModels/errorResponse';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private requestService: ApiRequestService,
    private route: Router
  ) {}

  doLogin(user: User) {
    return this.requestService.postLogin(user)
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

  getJWTPayload() {
    return jwt_decode(localStorage.getItem('accessToken')!);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
  // getLogin() {
  //   this.http.get('http://localhost:8080/login').subscribe((val) => {
  //     console.log('is logged in');
  //   });
  // }
}
