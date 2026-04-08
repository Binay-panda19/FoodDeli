import express from "express";
import {
  getFoods,
  addFood,
  deleteFood,
} from "../controllers/foodController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/", getFoods);

router.post("/add", protect, adminOnly, addFood);
router.delete("/:id", protect, adminOnly, deleteFood);

export default router;
