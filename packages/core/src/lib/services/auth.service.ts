import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse, DecodedTokenModel, JwtDecoderService } from 'core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  jwtDecoder = inject(JwtDecoderService);

  private userSubject = new BehaviorSubject(
    this.jwtDecoder.decodeToken(localStorage.getItem('accessToken')),
  );
  public user: Observable<DecodedTokenModel | null>;

  get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<AuthResponse>('http://localhost:8080/api/auth/login', {
      username,
      password,
    });
  }

  setTokensToLocalStorage(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    this.userSubject.next(this.jwtDecoder.decodeToken(accessToken));
  }

  refreshToken() {
    return this.http
      .post<AuthResponse>('http://localhost:8080/api/auth/refreshToken', {
        refreshToken: localStorage.getItem('refreshToken'),
      })
  }

  logout() {
    this.http
      .post('http://localhost:8080/api/auth/logout', {
        refreshToken: localStorage.getItem('refreshToken'),
      })
      .subscribe();
    localStorage.clear();
    this.userSubject.next(undefined);
    this.router.navigate(['login']);
  }
}
