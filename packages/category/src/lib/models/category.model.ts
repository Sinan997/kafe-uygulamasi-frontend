import { ProductModel } from 'category';

export interface CategoryModel {
  _id: string;
  name: string;
  index: number;
  products: ProductModel[];
}
