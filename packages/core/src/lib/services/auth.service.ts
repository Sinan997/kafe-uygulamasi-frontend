import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse, AuthUserModel, JwtDecoderService } from 'core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  http = inject(HttpClient);
  jwtDecoder = inject(JwtDecoderService);

  private userSubject = new BehaviorSubject(
    this.jwtDecoder.decodeToken(localStorage.getItem('accessToken')),
  );
  public user: Observable<AuthUserModel | null>;

  get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    this.http
      .post<AuthResponse>('http://localhost:8080/api/auth/login', { username, password })
      .subscribe((res) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.userSubject.next(this.jwtDecoder.decodeToken(res.accessToken));
      });
  }

  logout() {
    this.http.post('http://localhost:8080/api/auth/logout', localStorage.getItem('refreshToken'));
    localStorage.clear();
    location.replace('/login');
  }
}
