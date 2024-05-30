import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GetBusinessesResponse } from '../models/get-businesses-response.model';
import { AddBusinessModel } from '../models/add-business.model';
import { BasicResponseModel } from 'theme-shared';
import { EditBusinessModel } from '../models/edit-business.modal';
import { API_URL } from 'core';

@Injectable({
  providedIn: 'root',
})
export class BusinessManagementService {
  protected readonly http = inject(HttpClient);
  protected readonly baseUrl: string = inject(API_URL) + 'admin';

  addBusiness(business: AddBusinessModel) {
    return this.http.post<BasicResponseModel>(this.baseUrl + '/add-business', business);
  }

  getBusinesses() {
    return this.http.get<GetBusinessesResponse>(this.baseUrl + '/get-business');
  }

  deleteBusiness(id: string) {
    return this.http.request<BasicResponseModel>('delete', this.baseUrl + '/delete-business', {
      body: { id },
    });
  }

  updateBusiness(business: EditBusinessModel) {
    return this.http.put<BasicResponseModel>(this.baseUrl + '/update-business', business);
  }
}
