import express from "express";
import {
  createOrder,
  verifyPayment,
  getOrders,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { updateOrderStatus } from "../controllers/orderController.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/get", protect, getOrders);
router.post("/create", protect, createOrder);
router.post("/verify", protect, verifyPayment);

router.patch("/:id/status", protect, adminOnly, updateOrderStatus);

export default router;
