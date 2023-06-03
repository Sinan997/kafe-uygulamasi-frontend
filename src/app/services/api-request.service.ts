import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/userModel';
import { Observable } from 'rxjs';
import { loginResponse } from '../models/apiModels/loginResponse';
import { errorResponse } from '../models/apiModels/errorResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private http: HttpClient) { }

  postLogin(user: User): Observable<loginResponse | errorResponse> {
    return this.http.post<loginResponse | errorResponse>('http://localhost:8080/login', user)
  }
  
}
