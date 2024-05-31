import { BasicResponseModel } from 'theme-shared';
import { CategoryModel } from './category.model';

export interface AllCategoriesReponse extends BasicResponseModel {
  categories: CategoryModel[];
}