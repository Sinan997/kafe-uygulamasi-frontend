import { productModel } from "./productModel";

export interface categoryModel{
  _id:string,
  title:string,
  index:number,
  products:productModel[]
}