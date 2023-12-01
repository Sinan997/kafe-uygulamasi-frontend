import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GetUsersResponse } from '../models/get-users-response.model';
import { UserModel } from '../models/user.model';
import { AddUserModel } from '../models/add-user.model';
import { BasicResponseModel } from 'theme-shared';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  http = inject(HttpClient);

  getUsers() {
    return this.http.get<GetUsersResponse>('http://localhost:8080/api/user/all-users');
  }

  addUser(user: AddUserModel) {
    return this.http.post<BasicResponseModel>('http://localhost:8080/api/user/add-user', user);
  }

  deleteUser(id: string) {
    return this.http.request<BasicResponseModel>(
      'delete',
      'http://localhost:8080/api/user/delete-user',
      { body: { id } },
    );
  }

  updateUser(user: UserModel) {
    return this.http.put<BasicResponseModel>('http://localhost:8080/api/user/update-user', user);
  }
}
