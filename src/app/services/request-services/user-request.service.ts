import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { allUserResponse } from 'src/app/models/api-response-models/allUserResponse';
import { addUserResponse } from 'src/app/models/api-response-models/addUserResponse';
import { User } from 'src/app/models/userModel';
import { basicResponse } from 'src/app/models/api-response-models/basicResponse';

@Injectable({
  providedIn: 'root',
})
export class UserRequestService {
  userUrl: string = 'http://localhost:8080/api/user';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.token,
    });
  }

  getAllUsers() {
    return this.http.get<allUserResponse>(this.userUrl + '/all-users', {
      headers: this.headers,
    });
  }

  addUser(user:User) {
    return this.http.post<addUserResponse>(this.userUrl + '/add-user', user, { headers: this.headers });
  }

  deleteUser(id:string){
    return this.http.request<basicResponse>('delete',this.userUrl + '/delete-user', { body: { id }, headers: this.headers});
  }

  deleteUsers(ids:string[]){
    return this.http.request<basicResponse>('delete',this.userUrl + '/delete-users', { body: { ids }, headers: this.headers});
  }

  updateUser(user:User){
    return this.http.put<addUserResponse>(this.userUrl + '/update-user', user, { headers: this.headers })
  }
}
