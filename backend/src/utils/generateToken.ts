import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const generateToken = (userId: Types.ObjectId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: "7d" });

  return token;
};

export default generateToken;
