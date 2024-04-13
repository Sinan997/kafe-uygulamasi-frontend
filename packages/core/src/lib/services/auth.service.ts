import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { API_URL, AuthResponse, DecodedUserTokenModel, JwtDecoderService } from 'core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl: string = inject(API_URL) + 'auth';
  http = inject(HttpClient);
  router = inject(Router);
  jwtDecoder = inject(JwtDecoderService);
  window = inject(DOCUMENT).defaultView;

  userSubject = new BehaviorSubject(
    this.jwtDecoder.decodeToken(localStorage.getItem('accessToken')),
  );
  public user: Observable<DecodedUserTokenModel>;

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
            this.window!.location.reload();
          }),
        )
        .subscribe();
    });
  }

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

  getUser() {
    return this.jwtDecoder.decodeToken(this.accessToken);
  }
}
