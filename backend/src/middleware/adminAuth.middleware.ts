import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.headers;
    console.log(token);

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized Login Again!!" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET as string);

    console.log("decode:", decode.email);
    console.log("expected:", process.env.ADMIN_EMAIL);

    if (decode.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ success: false, message: "Not Authorized Login Again!!" });
    }

    next();
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
