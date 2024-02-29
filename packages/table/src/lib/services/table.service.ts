import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BasicResponseModel } from 'theme-shared';
import { API_URL } from 'core';
import { AllTablesResponse } from '../models/all-tables-response.model';
import { TableModel } from '../models/table.model';
import { GetTableOrdersResponse } from '../models/table-orders-response.model';
import { OrderModel } from '../models/order.model';
import { ProductModel } from 'menu';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  baseUrl: string = inject(API_URL) + 'table';
  http = inject(HttpClient);

  addTable(name: string) {
    return this.http.post<BasicResponseModel>(this.baseUrl + '/add-table', { name });
  }

  getTables() {
    return this.http.get<AllTablesResponse>(this.baseUrl + '/get-tables');
  }

  deleteTable(id: string) {
    return this.http.request<BasicResponseModel>('delete', this.baseUrl + '/delete-table', {
      body: { id },
    });
  }

  updateTable(id: string, name: string) {
    return this.http.put<BasicResponseModel>(this.baseUrl + '/update-table', { id, name });
  }

  addOrder(orders: TableModel[], tableId: string) {
    return this.http.post<BasicResponseModel>(this.baseUrl + '/add-order', { orders, tableId });
  }

  getTableOrders(tableId: string) {
    return this.http.post<GetTableOrdersResponse>(this.baseUrl + '/get-table-orders', { tableId });
  }

  takeOrders(tableId: string, orders: { _id: string; name: string, price: number, amount: number; }[]) {
    return this.http.post<GetTableOrdersResponse>(this.baseUrl + '/take-orders', { tableId, orders });
  }
}
