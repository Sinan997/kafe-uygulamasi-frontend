import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { AuthService, JwtDecoderService } from 'core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  authService = inject(AuthService);
  decoder = inject(JwtDecoderService);
  router = inject(Router);
  messageService = inject(MessageService);
  translateService = inject(TranslateService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return this.handle401Error(request, next);
        }
        this.handleWithToast(err);
        return of();
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
        this.handleWithToast(err);
        return of();
      }),
    );
  }

  private handleWithToast(err: HttpErrorResponse){
    if (err.status === 403) {
      this.authService.logout();
    }
    if (err.status !== 401 && err.status !== 403) {
      this.messageService.add({
        severity: 'error',
        summary: 'İşlem Başarısız',
        detail: this.translateService.instant('error.' + err.error.code),
      });
    }
  }
}

