import { BasicResponseModel } from 'packages/core/src/lib/models/basic-response.model';
import { CategoryModel } from 'menu';

export interface GetQrMenuResponseModel extends BasicResponseModel {
  categories: CategoryModel[];
}
