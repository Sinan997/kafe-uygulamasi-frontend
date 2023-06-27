import { productModel } from "../productModel";


export interface addProductResponse {
  message: string,
  success: boolean,
  product: productModel
}
