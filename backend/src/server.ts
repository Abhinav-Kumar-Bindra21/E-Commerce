import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

const PORT: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
