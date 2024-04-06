import { BasicResponseModel } from 'theme-shared';
import { OrderModel } from './order.model';

export interface GetOrdersResponse extends BasicResponseModel {
  orders: OrderModel[];
}
