import { categoryModel } from "../categoryModel";

export interface addCategoryRespone {
  message:string,
  success:boolean,
  category:categoryModel
}