import { BasicResponseModel } from "theme-shared";
import { CategoryModel } from "category";

export interface AllCategoriesReponse extends BasicResponseModel{
    categories: CategoryModel[]
}