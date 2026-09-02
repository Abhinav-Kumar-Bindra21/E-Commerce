import { Request, Response } from "express";
import User from "../models/user.model";
import { success } from "zod";

interface CartData {
  [itemId: string]: {
    [size: string]: number;
  };
}

// Add product to user cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData as CartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await User.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({ success: true, message: "Added To Cart" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// update product in cart
export const updateCart = async (req: Request, res: Response) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData as CartData;

    cartData[itemId][size] = quantity;

    await User.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Cart Updated Successfully" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// get user car data
export const getUserCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(400).json({ success: false, message: "User Not Found" });
    }

    const cartData = userData.cartData;

    res.status(200).json({ success: true, message: "Data send successfully", cartData: userData.cartData });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
