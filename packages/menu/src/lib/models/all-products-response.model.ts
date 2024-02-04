import { BasicResponseModel } from 'theme-shared';
import { ProductModel } from './product.model';

export interface AllProductsResponse extends BasicResponseModel {
  products: ProductModel[];
}
