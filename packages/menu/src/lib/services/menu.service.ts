import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllCategoriesReponse } from '../models/all-categories-response.model';
import { BasicResponseModel } from 'theme-shared';
import { CategoryModel } from 'category';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  baseUrl: string = 'http://localhost:8080/api/menu';

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<AllCategoriesReponse>(this.baseUrl + '/all-categories', {});
  }

  addCategory(name: string) {
    return this.http.post<BasicResponseModel>(this.baseUrl + '/add-category', { name });
  }

  deleteCategory(id: string) {
    return this.http.request<BasicResponseModel>('delete', this.baseUrl + '/delete-category', {
      body: { id },
    });
  }

  setCategoriesIndex(categories: CategoryModel[]) {
    return this.http.post<BasicResponseModel>(this.baseUrl + '/set-categories-index', {
      categories,
    });
  }
}
