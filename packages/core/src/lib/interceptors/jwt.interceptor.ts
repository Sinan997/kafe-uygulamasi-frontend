import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService, JwtDecoderService } from 'core';

@Injectable()
export class SetAccessTokenInterceptor implements HttpInterceptor {
  authService = inject(AuthService);
  decoder = inject(JwtDecoderService);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.authService.userValue;
    const token = localStorage.getItem('accessToken');

    if (user) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
