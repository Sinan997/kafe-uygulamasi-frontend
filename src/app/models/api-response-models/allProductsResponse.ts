import { categoryModel } from "../categoryModel";
import { productModel } from "../productModel";


export interface allProductsResponse {
  success: boolean;
  products: [productModel];
  category: categoryModel
}
