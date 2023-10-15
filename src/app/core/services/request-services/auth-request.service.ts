import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from 'src/app/models/user-model';
import { LoginResponse } from 'src/app/models/api-response-models/login-response';
import { ErrorResponse } from 'src/app/models/api-response-models/error-response';


@Injectable({
  providedIn: 'root'
})
export class AuthRequestService {
  baseUrl:string = 'http://localhost:8080/api/auth'

  constructor(private http: HttpClient) { }

  postLogin(user: LoginModel) {
    return this.http.post<LoginResponse | ErrorResponse>( this.baseUrl + '/login', user)
  }
}
