import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AllCategoriesReponse } from '../models/all-categories-response.model';
import { BasicResponseModel } from 'theme-shared';
import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';
import { API_URL } from 'core';
import { GetCategoryResponse } from '../models/get-category-response.model';
import { AddProductModel } from '../models/add-product.model';
import { AllProductsResponse } from '../models/all-products-response.model';
import { ChangeCategoryResponseModel } from '../models/change-category-response.model';
import { UpdateProductModel } from '../models/update-product.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  baseUrl: string = inject(API_URL) + 'menu';
  http = inject(HttpClient);

  getCategories() {
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

  getCategory(categoryId: string) {
    return this.http.get<GetCategoryResponse>(this.baseUrl + '/get-category/' + categoryId);
  }

  getAllProducts(categoryId: string) {
    return this.http.get<AllProductsResponse>(this.baseUrl + '/all-products/' + categoryId);
  }

  changeCategoryName(name: string, categoryId: string) {
    return this.http.post<ChangeCategoryResponseModel>(this.baseUrl + '/change-category-name', {
      name,
      categoryId,
    });
  }

  addProduct(input: AddProductModel) {
    return this.http.post<BasicResponseModel>(this.baseUrl + '/add-product', {
      categoryId: input.categoryId,
      name: input.name,
      price: input.price,
      isAvailable: input.isAvailable,
    });
  }

  setProductsIndex(products: ProductModel[]) {
    return this.http.post<BasicResponseModel>(this.baseUrl + '/set-products-index', { products });
  }

  deleteProduct(productId: string) {
    return this.http.request<BasicResponseModel>('delete', this.baseUrl + '/delete-product', {
      body: { productId },
    });
  }

  updateProduct(input: UpdateProductModel) {
    return this.http.post<BasicResponseModel>(this.baseUrl + '/update-product', {
      name: input.name,
      price: input.price,
      isAvailable: input.isAvailable,
      productId: input._id,
    });
  }
}
