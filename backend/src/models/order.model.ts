import mongoose, { Schema } from "mongoose";

export interface Orders {
  userId: string;
  items: any[];
  amount: number;
  address: Record<string, any>;
  status: string;
  paymentMethod: string;
  payment: boolean;
  date: number;
}

const orderSchema = new Schema<Orders>(
  {
    userId: { type: String, required: true },
    items: { type: [Schema.Types.Mixed] as any, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, default: "Order Placed" },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true },
    date: { type: Number, required: true },
  },
  { timestamps: true },
);

const Orders = mongoose.model<Orders>("Orders", orderSchema);

export default Orders;
