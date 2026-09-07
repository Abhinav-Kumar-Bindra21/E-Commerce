import { Request, Response } from "express";
import Orders from "../models/order.model";
import User from "../models/user.model";
import Stripe from "stripe";

// global variables
const currency = "usd";
const deliveryCharge = 10;

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Placing orders using cod method

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!userId || !items || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Missing required order details",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order amount",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

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
    const { userId, items, amount, address } = req.body;

    const { origin } = req.headers;

    if (!userId || !items || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Missing required order details",
      });
    }

    // check for user existing or not

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Orders(orderData);

    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },

        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },

        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.status(200).json({ success: true, session_url: session.url });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Placing orders using Razorpay method

export const placeOrderRazorpay = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

// All Orders data from Admin panel

export const allOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Orders.find({});

    res.status(200).json({ success: true, message: "All Orders Data has Sent Successfully", orders });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// User order data for frontend

export const userOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const orders = await Orders.find({ userId });

    if (!orders) {
      return res.status(400).json({ success: false, message: "No Orders there" });
    }

    res.status(200).json({ success: true, message: "Orders Details Send", orders });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update order status

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "OrderId and Status is Missing" });
    }

    await Orders.findByIdAndUpdate(orderId, { status });

    res.status(200).json({ success: true, message: "Status Updated Successfully" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
