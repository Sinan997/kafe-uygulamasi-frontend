import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GetBusinessesResponse } from '../models/get-businesses-response.model';
import { BusinessModel } from '../models/business.model';
import { AddBusinessModel } from '../models/add-business.model';
import { BasicResponseModel } from 'theme-shared';
import { EditBusinessModel } from '../models/edit-business.modal';

@Injectable({
  providedIn: 'root',
})
export class BusinessManagementService {
  http = inject(HttpClient);

  addBusiness(business: AddBusinessModel) {
    return this.http.post<BasicResponseModel>(
      'http://localhost:8080/api/admin/add-business',
      business,
    );
  }

  getBusinesses() {
    return this.http.get<GetBusinessesResponse>('http://localhost:8080/api/admin/get-business');
  }

  deleteBusiness(id: string) {
    return this.http.request<BasicResponseModel>(
      'delete',
      'http://localhost:8080/api/admin/delete-business',
      { body: { id } },
    );
  }

  updateBusiness(business: EditBusinessModel) {
    return this.http.put<BasicResponseModel>(
      'http://localhost:8080/api/admin/update-business',
      business,
    );
  }
}
