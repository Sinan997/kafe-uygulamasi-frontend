import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { API_URL, AuthResponse, JwtDecoderService } from 'core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const accessTokenKey = 'accessToken';
const refreshTokenKey = 'refreshToken';

@Injectable({ providedIn: 'root' })
export class AuthService {
  protected readonly http = inject(HttpClient);
  protected readonly router = inject(Router);
  protected readonly jwtDecoder = inject(JwtDecoderService);
  protected readonly baseUrl: string = inject(API_URL) + 'auth';

  userSubject = new BehaviorSubject(this.jwtDecoder.decodeToken(localStorage.getItem(accessTokenKey)));

  get userValue() {
    return this.userSubject.value;
  }

  refreshTokenHttp() {
    return this.http.post<AuthResponse>(this.baseUrl + '/refreshToken', {
      refreshToken: localStorage.getItem(refreshTokenKey),
    });
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResponse>(this.baseUrl + '/login', {
        username,
        password,
      })
      .pipe(
        tap((res) => {
          this.setTokensToLocalStorage(res.accessToken, res.refreshToken);
          this.router.navigate(['']);
        }),
      )
      .subscribe();
  }

  logout() {
    this.router.navigate(['account', 'login']).then(() => {
      this.http
        .post('http://localhost:8080/api/auth/logout', {
          refreshToken: localStorage.getItem(refreshTokenKey),
        })
        .pipe(
          tap(() => {
            localStorage.removeItem(accessTokenKey);
            localStorage.removeItem(refreshTokenKey);
            this.userSubject.next(undefined);
          }),
        )
        .subscribe();
    });
  }

  setTokensToLocalStorage(accessToken: string, refreshToken: string) {
    localStorage.setItem(accessTokenKey, accessToken);
    localStorage.setItem(refreshTokenKey, refreshToken);
    this.userSubject.next(this.jwtDecoder.decodeToken(accessToken));
  }
}
