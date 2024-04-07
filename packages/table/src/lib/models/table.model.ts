import { OrderModel } from "orders";

export interface TableModel { 
  _id: string;
  name: string;
  orders: OrderModel[];
}