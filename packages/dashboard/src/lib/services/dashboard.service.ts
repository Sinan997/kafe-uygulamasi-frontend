import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from 'core';
import { GetAllCategoriesResponseModel } from '../models/get-all-categories-model';
import { GetAllOrdersResponseModel } from '../models/get-all-orders-model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  baseUrl: string = inject(API_URL) + 'business';
  http = inject(HttpClient);

  getOrders() {
    return this.http.get<GetAllOrdersResponseModel>(this.baseUrl + '/get-all-orders');
  }

  getCategories() {
    return this.http.get<GetAllCategoriesResponseModel>(this.baseUrl + '/get-all-categories');
  }
}
