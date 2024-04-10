import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GetUsersResponse } from '../models/get-users-response.model';
import { UserModel } from '../models/user.model';
import { AddUserModel } from '../models/add-user.model';
import { BasicResponseModel } from 'theme-shared';
import { API_URL } from 'core';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  baseUrl: string = inject(API_URL) + 'user';
  http = inject(HttpClient);

  getUsers() {
    return this.http.get<GetUsersResponse>(this.baseUrl + '/all-users');
  }

  addUser(user: AddUserModel) {
    return this.http.post<BasicResponseModel>(this.baseUrl + '/add-user', user);
  }

  deleteUser(userId: string) {
    return this.http.request<BasicResponseModel>('delete', this.baseUrl + '/delete-user', {
      body: { userId },
    });
  }

  updateUser(user: UserModel) {
    return this.http.put<BasicResponseModel>(this.baseUrl + '/update-user', user);
  }
}
