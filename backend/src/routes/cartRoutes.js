import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.get("/", protect, getCart);
// router.post("/add", protect, addToCart);
// router.post("/remove", protect, removeFromCart);

router.get("/", getCart);
router.post("/add", addToCart);
router.post("/remove", removeFromCart);

export default router;
