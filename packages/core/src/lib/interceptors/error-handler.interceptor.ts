import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { AuthService, isCodeTranslated } from 'core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  authService = inject(AuthService);
  router = inject(Router);
  messageService = inject(MessageService);
  translateService = inject(TranslateService);

  errorPrefix = 'error.';

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return this.handle401Error(request, next);
        }
        if (err.status === 403) {
          this.authService.logout();
          return EMPTY;
        }
        this.handleWithToast(err);
        return throwError(() => err);
      }),
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.refreshTokenHttp().pipe(
      catchError(() => {
        this.authService.logout();
        return of();
      }),
      tap((res) => {
        this.authService.setTokensToLocalStorage(res.accessToken, res.refreshToken);
      }),
      switchMap((res) => {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${res.accessToken}`,
          },
        });
        this.authService.setTokensToLocalStorage(res.accessToken, res.refreshToken);
        return next.handle(request).pipe(
          catchError((err) => {
            this.handleWithToast(err);
            return throwError(() => err);
          }),
        );
      }),
    );
  }

  private handleWithToast(err: HttpErrorResponse) {
    const message = this.translateService.instant(
      this.errorPrefix + err.error.code,
      err.error.data,
    );

    const isTranslated = isCodeTranslated(this.errorPrefix, message);
    const errorKey = this.translateService.instant('errorKey');

    this.messageService.add({
      severity: 'error',
      summary: errorKey,
      detail: isTranslated ? message : err.error.message,
    });
  }
}
