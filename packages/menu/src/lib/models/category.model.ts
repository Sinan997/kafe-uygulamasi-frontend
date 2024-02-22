import { ProductModel } from './product.model';

export interface CategoryModel {
  _id: string;
  name: string;
  index: number;
  products: ProductModel[];
}
