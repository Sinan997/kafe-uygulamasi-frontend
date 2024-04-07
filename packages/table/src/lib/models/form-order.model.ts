import { OrderModel } from 'orders';

export interface FormOrderModel extends OrderModel {
  pickedAmount: number;
}
