import { ObjectId, Types } from "mongoose";
import { OrderStatus } from "../enums/order.enum";

export interface OrderItem {
  _id: ObjectId;
  itemQuantity: number;
  itemPrice: number;
  orderId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: Types.ObjectId;
  orderTotal: number;
  orderDelivery: number;
  orderStatus: OrderStatus;
  memberId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItemInput {
  itemQuantity: number;
  itemPrice: number;
  productId: Types.ObjectId;
  orderId?: Types.ObjectId;
}
