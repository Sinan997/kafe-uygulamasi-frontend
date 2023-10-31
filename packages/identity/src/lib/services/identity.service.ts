import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { GetUsersResponse } from '../models/get-users-response';
import { User } from '../models/user';
import { addUserResponse } from '../models/add-user-response';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  http = inject(HttpClient);

  getUsers() {
    return this.http.get<GetUsersResponse>('http://localhost:8080/api/user/all-users');
  }

  addUser(user: User) {
    return this.http.post<addUserResponse>('http://localhost:8080/api/user/add-user', user);
  }

  deleteUser(id: string) {
    return this.http.request<{ message: string; success: boolean }>(
      'delete',
      'http://localhost:8080/api/user/delete-user',
      { body: { id } },
    );
  }

  updateUser(user: User) {
    return this.http.put<addUserResponse>('http://localhost:8080/api/user/update-user', user);
  }
}
