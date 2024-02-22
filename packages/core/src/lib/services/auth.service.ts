import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { API_URL, AuthResponse, DecodedUserTokenModel, JwtDecoderService } from 'core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl: string = inject(API_URL) + 'auth';
  http = inject(HttpClient);
  router = inject(Router);
  jwtDecoder = inject(JwtDecoderService);

  userSubject = new BehaviorSubject(
    this.jwtDecoder.decodeToken(localStorage.getItem('accessToken')),
  );
  public user: Observable<DecodedUserTokenModel>;

  get userValue() {
    return this.userSubject.value;
  }

  get accessToken() {
    return localStorage.getItem('accessToken');
  }

  get refreshToken() {
    return localStorage.getItem('refreshToken');
  }

  setTokensToLocalStorage(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    this.userSubject.next(this.jwtDecoder.decodeToken(accessToken));
  }

  refreshTokenHttp() {
    return this.http.post<AuthResponse>(this.baseUrl + '/refreshToken', {
      refreshToken: localStorage.getItem('refreshToken'),
    });
  }

  login(username: string, password: string) {
    return this.http.post<AuthResponse>(this.baseUrl + '/login', {
      username,
      password,
    });
  }

  logout() {
    this.router.navigate(['account', 'login']).then(() => {
      this.http
        .post('http://localhost:8080/api/auth/logout', {
          refreshToken: localStorage.getItem('refreshToken'),
        })
        .pipe(
          tap(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            this.userSubject.next(undefined);
          }),
        )
        .subscribe();
    });
  }

  getUser() {
    return this.jwtDecoder.decodeToken(this.accessToken);
  }
}
