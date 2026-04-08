import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

// ── Core Middleware ──────────────────────────────────────

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());

// ── Health Check ─────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "FoodDeli API is running..." });
});

// ── API Routes ───────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);

// ── 404 Handler ──────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ── Global Error Handler ─────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
