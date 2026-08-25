import { Request, Response } from "express";
import { email, z } from "zod";
import User from "../models/user.model";
import validator from "validator";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";

const registerUserSchema = z.object({
  userName: z.string().trim().min(3, "Name must be at least 3 characters"),
  emailId: z.string().trim().email("Please enter a valid email"),
  password: z.string().min(7, "Password must be at least 7 characters"),
});

const loginSchema = z.object({
  email,
});

// Register User Function

export const registerUser = async (req: Request, res: Response) => {
  try {
    const result = registerUserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ success: false, message: "Validation failed", errors: result.error.issues });
    }
    const { userName, emailId, password } = result.data;

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ success: false, message: "Password is too weak" });
    }

    const exitsUser = await User.findOne({ emailId });

    if (exitsUser) {
      return res.status(409).json({ success: false, message: "User already exits, Please login !!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      emailId,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = generateToken(user._id);

    res.status(201).json({ success: true, message: "User register successfully", token });
  } catch (error: any) {
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
