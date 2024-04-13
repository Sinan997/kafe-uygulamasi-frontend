import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BasicResponseModel } from 'theme-shared';
import { API_URL } from 'core';
import { GetOrdersResponse } from '../models/get-orders-response.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl: string = inject(API_URL) + 'order';
  http = inject(HttpClient);

  getOrders() {
    return this.http.get<GetOrdersResponse>(this.baseUrl + '/all-orders');
  }

  setOrderReady(orderId: string) {
    return this.http.put<BasicResponseModel>(this.baseUrl + '/set-ready/' + orderId, {});
  }

  setOrderDelivered(orderId: string) {
    return this.http.put<BasicResponseModel>(this.baseUrl + '/set-delivered/' + orderId, {});
  }
}
