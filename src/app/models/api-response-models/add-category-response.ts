import { categoryModel } from "../category-model";

export interface addCategoryRespone {
  message:string,
  success:boolean,
  category:categoryModel
}