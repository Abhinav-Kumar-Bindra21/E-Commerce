import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDb from "./config/db";
import connectCloudinary from "./config/cloudinary";
import userRouter from "./routes/user.route";
import productRouter from "./routes/product.route";

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;
connectDb();
connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json());

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
