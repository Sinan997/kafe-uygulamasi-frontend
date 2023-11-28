import { categoryModel } from 'src/app/models/category-model';

export interface GetCategoryResponse {
  message: string;
  success: boolean;
  category: categoryModel;
}
