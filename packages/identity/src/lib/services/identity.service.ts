import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GetUsersResponse } from '../models/get-users-response.model';
import { UserModel } from '../models/user.model';
import { AddUserModel, AddUserResponseModel } from '../models/add-user.model';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  http = inject(HttpClient);

  getUsers() {
    return this.http.get<GetUsersResponse>('http://localhost:8080/api/user/all-users');
  }

  addUser(user: AddUserModel) {
    return this.http.post<AddUserResponseModel>('http://localhost:8080/api/user/add-user', user);
  }

  deleteUser(id: string) {
    return this.http.request<{ message: string; success: boolean }>(
      'delete',
      'http://localhost:8080/api/user/delete-user',
      { body: { id } },
    );
  }

  updateUser(user: UserModel) {
    return this.http.put<AddUserResponseModel>('http://localhost:8080/api/user/update-user', user);
  }
}
