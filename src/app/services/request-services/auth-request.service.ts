import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginModel } from '../../models/userModel';
import { loginResponse } from '../../models/api-response-models/loginResponse';
import { errorResponse } from '../../models/api-response-models/errorResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthRequestService {
  authUrl:string = 'http://localhost:8080/api/auth'

  constructor(private http: HttpClient) { }

  postLogin(user: loginModel) {
    return this.http.post<loginResponse | errorResponse>( this.authUrl + '/login', user)
  }
}
