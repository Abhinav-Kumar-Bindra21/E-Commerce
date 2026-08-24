import { Request, Response } from "express";
import { z } from "zod";
import User from "../models/user.model";
import validator from "validator";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";

const registerUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(7, "Password must be at least 7 characters"),
});

// Register User Function

export const registerUser = async (req: Request, res: Response) => {
  try {
    const result = registerUserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ success: false, message: "Validation failed", errors: result.error.issues });
    }
    const { name, email, password } = req.body;

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ success: false, message: "Password is too weak" });
    }

    const exitsUser = await User.findOne({ email });

    if (exitsUser) {
      return res.status(400).json({ success: false, message: "User already exits, Please login !!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = generateToken(user._id);

    res.status(201).json({ success: true, message: "User register successfully", token });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Login user function

export const loginUser = (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

// Admin login function

export const adminLogin = (req: Request, res: Response) => {
  try {
  } catch (error) {}
};
