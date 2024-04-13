import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from 'core';
import { GetQrMenuResponseModel } from '../models/get-qrmenu-response.model';

@Injectable({
  providedIn: 'root',
})
export class QrMenuService {
  baseUrl: string = inject(API_URL) + 'qrmenu';

  http = inject(HttpClient);

  getCategoriesAndProducts(businessName: string) {
    return this.http.get<GetQrMenuResponseModel>(
      this.baseUrl + '/get-categories-products/' + businessName,
    );
  }
}
