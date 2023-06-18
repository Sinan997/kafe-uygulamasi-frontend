import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allCategoriesReponse } from 'src/app/models/api-response-models/allCategoriesResponse';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuRequestService {
  baseUrl:string = 'http://localhost:8080/api/menu'
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.token,
    });
  }

  getAllCategories(){
    return this.http.get<allCategoriesReponse>(this.baseUrl + '/all-categories', {
      headers: this.headers,
    });
  }
}
