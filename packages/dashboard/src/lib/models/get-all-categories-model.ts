import { ProductModel } from 'menu';
import { BasicResponseModel } from 'theme-shared';

export interface GetAllCategoriesResponseModel extends BasicResponseModel {
  categories: AllCategoriesModel[];
}

export interface AllCategoriesModel {
  _id: string;
  name: string;
  index: number;
  products: ProductModel[];
}
