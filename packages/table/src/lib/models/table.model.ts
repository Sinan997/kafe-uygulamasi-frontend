import { OrderModel } from "./order.model";

export interface TableModel { 
  _id: string;
  name: string;
  orders: OrderModel[];
}