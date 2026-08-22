import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDb from "./config/db";

const app = express();

// Connected to database

connectDb();
const PORT: number = Number(process.env.PORT) || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoints

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
