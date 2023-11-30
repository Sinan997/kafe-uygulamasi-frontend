import { BasicResponseModel } from 'theme-shared';
import { CategoryModel } from './category.model';

export interface ChangeCategoryResponseModel extends BasicResponseModel {
  category: CategoryModel;
}
