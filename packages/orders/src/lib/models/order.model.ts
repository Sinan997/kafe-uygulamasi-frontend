import { ProductModel } from 'menu';
import { TableModel } from 'table';

export interface OrderModel {
  _id: string;
  amount: number;
  isDelivered: boolean;
  isReady: boolean;
  productId: ProductModel;
  tableId: TableModel;
}
