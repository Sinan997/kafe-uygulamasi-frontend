import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddProductModel } from '../models/add-product.model';
import { GetCategoryResponse } from '../models/get-category-response.model';
import { UpdateProductModel } from '../models/update-product.model';
import { BasicResponseModel } from 'theme-shared';
import { ProductModel } from '../models'
import { AllProductsResponse } from '../models/all-products-response.model';
import { ChangeCategoryResponseModel } from '../models/change-category-response.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl: string = 'http://localhost:8080/api/category';

  constructor(private http: HttpClient) {}

  getCategory(categoryId: string) {
    return this.http.get<GetCategoryResponse>(this.baseUrl + '/get-category/' + categoryId);
  }

  getAllProducts(categoryId: string) {
    return this.http.get<AllProductsResponse>(this.baseUrl + '/all-products/' + categoryId);
  }

  addProduct(input: AddProductModel) {
    return this.http.post<BasicResponseModel>(this.baseUrl + '/add-product', {
      categoryId: input.categoryId,
      name: input.name,
      price: input.price,
      isAvailable: input.isAvailable,
    });
  }

  changeCategoryName(title: string, categoryId: string) {
    return this.http.post<ChangeCategoryResponseModel>(this.baseUrl + '/change-category-name', {
      title,
      categoryId,
    });
  }

  deleteProduct(productId: string) {
    return this.http.request<BasicResponseModel>('delete', this.baseUrl + '/delete-product', {
      body: { productId },
    });
  }

  setProductsIndex(products: ProductModel[]) {
    return this.http.post<BasicResponseModel>(this.baseUrl + '/set-products-index', { products });
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
