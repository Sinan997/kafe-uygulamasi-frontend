import { categoryModel } from "../category-model";
import { productModel } from "../product-model";


export interface allProductsResponse {
  success: boolean;
  products: [productModel];
  category: categoryModel
}
