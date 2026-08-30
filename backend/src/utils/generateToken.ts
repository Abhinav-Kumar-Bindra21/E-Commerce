import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateToken = (userId: Types.ObjectId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: "7d" });

  return token;
};

export const generateAdminToken = (emailId: string) => {
  const token = jwt.sign({ emailId }, process.env.JWT_SECRET as string, { expiresIn: "7d" });

  return token;
};
