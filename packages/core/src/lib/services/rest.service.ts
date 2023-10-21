import { HttpClient, HttpParameterCodec, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Rest } from '../models/rest';

@Injectable({
  providedIn: 'root',
})
export class RestService {
//   constructor(
//     protected http: HttpClient,
//   ) {}

//   protected getApiFromStore(apiName: string | undefined): string {
//     return this.environment.getApiUrl(apiName);
//   }

//   // handleError(err: any): Observable<any> {
//   //   this.httpErrorReporter.reportError(err);
//   //   return throwError(err);
//   // }

//   request<T, R>(
//     request: HttpRequest<T> | Rest.Request<T>,
//     config?: Rest.Config,
//     api?: string,
//   ): Observable<R> {
//     config = config || ({} as Rest.Config);
//     api = api || this.getApiFromStore(config.apiName);
//     const { method, params, ...options } = request;
//     const { observe = Rest.Observe.Body, skipHandleError } = config;
//     const url = this.removeDuplicateSlashes(api + request.url);

//     const httpClient: HttpClient = this.getHttpClient(config.skipAddingHeader);
//     return httpClient
//       .request<R>(method, url, {
//         observe,
//         ...(params && {
//           params: this.getParams(params, config.httpParamEncoder),
//         }),
//         ...options,
//       } as any)
//       // .pipe(catchError(err => (skipHandleError ? throwError(err) : this.handleError(err))));
//   }
//   private getHttpClient(isExternal: boolean) {
//     return isExternal ? this.externalHttp : this.http;
//   }

//   private getParams(params: Rest.Params, encoder?: HttpParameterCodec): HttpParams {
//     const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
//       if (isUndefinedOrEmptyString(value)) return acc;
//       if (value === null && !this.options.sendNullsAsQueryParam) return acc;
//       acc[key] = value;
//       return acc;
//     }, {} as any);
//     return encoder
//       ? new HttpParams({ encoder, fromObject: filteredParams })
//       : new HttpParams({ fromObject: filteredParams });
//   }

//   private removeDuplicateSlashes(url: string): string {
//     return url.replace(/([^:]\/)\/+/g, '$1');
//   }
}
