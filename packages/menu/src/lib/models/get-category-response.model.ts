import { BasicResponseModel } from 'theme-shared';
import { CategoryModel } from './category.model';

export interface GetCategoryResponse extends BasicResponseModel {
  category: CategoryModel;
}
