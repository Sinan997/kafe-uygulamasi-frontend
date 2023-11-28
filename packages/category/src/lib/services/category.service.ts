import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allCategoriesReponse } from 'src/app/models/api-response-models/all-categories-response';
import { addCategoryRespone } from 'src/app/models/api-response-models/add-category-response';
import { categoryModel } from 'src/app/models/category-model';
import { allProductsResponse } from 'src/app/models/api-response-models/all-products-response';
import { addProductResponse } from 'src/app/models/api-response-models/add-product-response';
import { productModel } from 'src/app/models/product-model';
import { basicResponse } from 'src/app/models/api-response-models/basic-response';
import { AddProductModel } from '../models/add-product.model';
import { GetCategoryResponse } from '../models/get-category-response.model';
import { UpdateProductModel } from '../models/update-product.model';

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
    return this.http.get<allProductsResponse>(this.baseUrl + '/all-products/' + categoryId);
  }

  addProduct(input: AddProductModel) {
    return this.http.post<addProductResponse>(this.baseUrl + '/add-product', {
      categoryId: input.categoryId,
      name: input.name,
      price: input.price,
      isAvailable: input.isAvailable,
    });
  }

  changeCategoryName(title: string, categoryId: string) {
    return this.http.post<addCategoryRespone>(this.baseUrl + '/change-category-name', {
      title,
      categoryId,
    });
  }

  deleteProduct(productId: string) {
    return this.http.request<addProductResponse>('delete', this.baseUrl + '/delete-product', {
      body: { productId },
    });
  }

  setProductsIndex(products: productModel[]) {
    return this.http.post<basicResponse>(this.baseUrl + '/set-products-index', { products });
  }

  updateProduct(input: UpdateProductModel) {
    return this.http.post<addProductResponse>(this.baseUrl + '/update-product', {
      name: input.name,
      price: input.price,
      isAvailable: input.isAvailable,
      productId: input._id,
    });
  }
}
