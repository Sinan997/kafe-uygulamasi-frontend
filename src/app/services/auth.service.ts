import { Injectable } from '@angular/core';
import { loginModel } from '../models/userModel';
import { ApiRequestService } from './api-request.service';
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
    return this.requestService.postLogin(user)
  }

  logout(){
    localStorage.clear()
    this.route.navigate(['login'])
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
  // getLogin() {
  //   this.http.get('http://localhost:8080/login').subscribe((val) => {
  //     console.log('is logged in');
  //   });
  // }
}
