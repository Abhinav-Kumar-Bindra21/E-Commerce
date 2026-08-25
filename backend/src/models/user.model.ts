import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  userName: string;
  email: string;
  password: string;
  cartData: object;
}

const userSchema = new Schema<User>(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { timestamps: true, minimize: false },
);

const User = mongoose.model<User>("User", userSchema);

export default User;
