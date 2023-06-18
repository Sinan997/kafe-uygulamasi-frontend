import { categoryModel } from '../categoryModel';

export interface allCategoriesReponse {
  success: boolean;
  categories: [categoryModel];
}
