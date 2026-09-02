import express from "express";
import { addToCart, getUserCart, updateCart } from "../controllers/cart.controller";
import authUser from "../middleware/userAuth.middleware";

const cartRouter = express.Router();

cartRouter.use(authUser);

cartRouter.post("/get", getUserCart);
cartRouter.post("/add", addToCart);
cartRouter.get("/update", updateCart);

export default cartRouter;
