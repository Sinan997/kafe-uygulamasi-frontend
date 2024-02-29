import { ProductModel } from "menu";
import { BasicResponseModel } from "theme-shared";

export interface GetTableOrdersResponse extends BasicResponseModel {
    orders: {
      product: ProductModel,
      amount: number
    }[]
}