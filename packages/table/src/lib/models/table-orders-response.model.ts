import { BasicResponseModel } from 'theme-shared';
import { OrderModel } from 'orders';

export interface GetTableOrdersResponse extends BasicResponseModel {
  orders: OrderModel[];
}
