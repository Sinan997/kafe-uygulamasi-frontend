import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allCategoriesReponse } from 'src/app/models/api-response-models/all-categories-response';
import { addCategoryRespone } from 'src/app/models/api-response-models/add-category-response';
import { categoryModel } from 'src/app/models/category-model';
import { allProductsResponse } from 'src/app/models/api-response-models/all-products-response';
import { addProductResponse } from 'src/app/models/api-response-models/add-product-response';
import { productModel } from 'src/app/models/product-model';
import { basicResponse } from 'src/app/models/api-response-models/basic-response';

@Injectable({
  providedIn: 'root',
})
export class MenuRequestService {
  baseUrl: string = 'http://localhost:8080/api/menu';

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<allCategoriesReponse>(this.baseUrl + '/all-categories', {});
  }

  addCategory(title: string, index: number) {
    return this.http.post<addCategoryRespone>(this.baseUrl + '/add-category', { title, index });
  }

  deleteCategory(id: string) {
    return this.http.request<addCategoryRespone>('delete', this.baseUrl + '/delete-category');
  }

  setCategoriesIndex(categories: categoryModel[]) {
    return this.http.post<basicResponse>(this.baseUrl + '/set-categories-index', { categories });
  }

  changeCategoryName(title: string, categoryId: string) {
    return this.http.post<addCategoryRespone>(this.baseUrl + '/change-categoryName', {
      title,
      categoryId,
    });
  }

  getAllProducts(categoryId: string) {
    return this.http.get<allProductsResponse>(this.baseUrl + '/all-products/' + categoryId);
  }

  addProduct(categoryId: string, name: string, index: number, price: number, isAvailable: boolean) {
    return this.http.post<addProductResponse>(this.baseUrl + '/add-product', {
      categoryId,
      name,
      index,
      price,
      isAvailable,
    });
  }

  updateProduct(name: string, price: number, isAvailable: boolean, productId: string) {
    return this.http.post<addProductResponse>(this.baseUrl + '/update-product', {
      name,
      price,
      isAvailable,
      productId,
    });
  }

  deleteProduct(productId: string) {
    return this.http.request<addProductResponse>('delete', this.baseUrl + '/delete-product');
  }

  setProductsIndex(products: productModel[]) {
    return this.http.post<basicResponse>(this.baseUrl + '/set-products-index', { products });
  }
}
