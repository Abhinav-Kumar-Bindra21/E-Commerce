import { Request, Response } from "express";
import Orders from "../models/order.model";
import User from "../models/user.model";

// Placing orders using cod method

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "cod",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Orders(orderData);

    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cardData: {} });

    res.status(200).json({ success: true, message: "Order Placed" });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Placing orders using Stripe method

export const placeOrderStripe = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

// Placing orders using Razorpay method

export const placeOrderRazorpay = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

// All Orders data from Admin panel

export const allOrders = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

// User order data for frontend

export const userOrders = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

// Update order status

export const updateStatus = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
