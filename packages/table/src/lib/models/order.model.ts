import { ProductModel } from "menu";

export interface OrderModel {
  product: ProductModel,
  amount: number
}