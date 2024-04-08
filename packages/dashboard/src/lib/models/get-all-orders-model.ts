import { ProductModel } from 'menu';
import { BasicResponseModel } from 'theme-shared';

export interface GetAllOrdersResponseModel extends BasicResponseModel {
  orders: AllOrdersModel[];
}

export interface AllOrdersModel {
  _id: string;
  baseAmount: number;
  amount: number;
  isDelivered: boolean;
  isReady: boolean;
  businessId: string;
  productId: ProductModel;
  tableId: string;
}
