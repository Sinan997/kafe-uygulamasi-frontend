import { categoryModel } from '../category-model';

export interface allCategoriesReponse {
  success: boolean;
  categories: [categoryModel];
}
