import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { allUserResponse } from 'src/app/models/api-response-models/allUserResponse';

@Injectable({
  providedIn: 'root',
})
export class UserRequestService {
  userUrl: string = 'http://localhost:8080/api/user';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
  }

  getAllUsers() {
    return this.http.get<allUserResponse>(this.userUrl + '/all-users', {
      headers: this.headers,
    });
  }
}
