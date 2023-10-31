import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService, JwtDecoderService } from 'core';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  authService = inject(AuthService);
  decoder = inject(JwtDecoderService);
  router = inject(Router);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(() => err);
      }),
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.refreshTokenHttp().pipe(
      switchMap((res) => {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${res.accessToken}`,
          },
        });
        this.authService.setTokensToLocalStorage(res.accessToken, res.refreshToken);
        return next.handle(request);
      }),
      catchError((err) => {
        this.authService.logout();
        return throwError(() => err);
      }),
    );
  }
}
