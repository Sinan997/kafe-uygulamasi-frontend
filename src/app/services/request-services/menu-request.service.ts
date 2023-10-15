import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allCategoriesReponse } from 'src/app/models/api-response-models/all-categories-response';
import { AuthService } from '../../core/services/auth.service';
import { addCategoryRespone } from 'src/app/models/api-response-models/add-category-response';
import { categoryModel } from 'src/app/models/category-model';
import { allProductsResponse } from 'src/app/models/api-response-models/all-products-response';
import { addProductResponse } from 'src/app/models/api-response-models/add-product-response';
import { productModel } from 'src/app/models/product-model';
import { basicResponse } from 'src/app/models/api-response-models/basic-response';

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

  addCategory(title: string, index: number){
    return this.http.post<addCategoryRespone>(this.baseUrl + '/add-category', { title, index }, {
      headers: this.headers,
    });
  }

  deleteCategory(id: string){
    return this.http.request<addCategoryRespone>('delete', this.baseUrl + '/delete-category', { body: { id }, headers: this.headers});
  }
  
  setCategoriesIndex(categories: categoryModel[]){
    return this.http.post<basicResponse>(this.baseUrl + '/set-categories-index', { categories }, {
      headers: this.headers,
    });
  }

  changeCategoryName(title: string, categoryId:string){
    return this.http.post<addCategoryRespone>(this.baseUrl + '/change-categoryName', { title, categoryId }, {
      headers: this.headers,
    });
  }

  getAllProducts(categoryId: string){
    return this.http.get<allProductsResponse>(this.baseUrl + '/all-products/' + categoryId, {
      headers: this.headers,
    });
  }

  addProduct(categoryId:string, name:string, index:number, price:number, isAvailable:boolean){
    return this.http.post<addProductResponse>(this.baseUrl + '/add-product', { categoryId, name, index, price, isAvailable }, {
      headers: this.headers,
    });
  }

  updateProduct(name: string, price: number, isAvailable: boolean, productId: string){
    return this.http.post<addProductResponse>(this.baseUrl + '/update-product', { name, price, isAvailable, productId }, {
      headers: this.headers,
    });
  }

  deleteProduct(productId:string){
    return this.http.request<addProductResponse>('delete', this.baseUrl + '/delete-product', { body: { productId }, headers: this.headers});
  }

  setProductsIndex(products: productModel[]){
    return this.http.post<basicResponse>(this.baseUrl + '/set-products-index', { products }, {
      headers: this.headers,
    });
  }
}
