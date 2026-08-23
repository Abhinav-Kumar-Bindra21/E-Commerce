import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDb from "./config/db";

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;
connectDb();

// Middleware
app.use(cors());
app.use(express.json());

// API endpoints

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
