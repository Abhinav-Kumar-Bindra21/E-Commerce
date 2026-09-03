import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized User, Login Again" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET as string);

    req.body.userId = decode.userId;

    next();
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export default authUser;
