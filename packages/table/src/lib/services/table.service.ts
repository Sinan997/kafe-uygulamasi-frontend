import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BasicResponseModel } from 'theme-shared';
import { API_URL } from 'core';
import { TableModel } from '../models/table.model';
import { AllTablesResponse } from '../models/all-tables-response.model';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  baseUrl: string = inject(API_URL) + 'table';
  http = inject(HttpClient);

  addTable(name: string) {
    return this.http.post<BasicResponseModel>(this.baseUrl + '/add-table', { name });
  }

  getTables(){
    return this.http.get<AllTablesResponse>(this.baseUrl + '/get-tables');
  }
}
