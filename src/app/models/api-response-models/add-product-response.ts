import { productModel } from "../product-model";


export interface addProductResponse {
  message: string,
  success: boolean,
  product: productModel
}
