import express from "express";
import { adminAuth } from "../middleware/adminAuth.middleware";
import {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  userOrders,
} from "../controllers/order.controller";
import authUser from "../middleware/userAuth.middleware";

const orderRouter = express.Router();

// Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/list", adminAuth, updateStatus);

// Payment Features

orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("razorpay", authUser, placeOrderRazorpay);

// User Features
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
