import { Request, Response } from "express";
import { success, z } from "zod";
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
  emailId: z.string().email("Please enter a valid email"),
  password: z.string().min(7, "Password must be at least 7 characters"),
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

export const loginUser = async (req: Request, res: Response) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ success: false, message: "Validation failed", errors: result.error.issues });
    }

    const { emailId, password } = result.data;

    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User Not Exist, Try SignIn!",
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(400).json({ success: false, message: "Invaild credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({ success: true, message: "User Loggeding Successfully", token });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Admin login function

export const adminLogin = (req: Request, res: Response) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ success: false, message: "Validation failed", errors: result.error.issues });
    }

    const { emailId, password } = result.data;

    if (!(emailId === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)) {
      return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    const token = generateToken(emailId + password);

    res.status(200).json({ success: true, message: "Admin Loggeding Successfully", token });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
