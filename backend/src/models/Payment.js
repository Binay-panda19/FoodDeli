import mongoose from "mongoose";
import crypto from "crypto";

const paymentSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    transactionId: {
      type: String,
      unique: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    method: {
      type: String,
      enum: {
        values: ["card", "upi", "cod"],
        message: "{VALUE} is not a valid payment method",
      },
      required: [true, "Payment method is required"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "success", "failed"],
        message: "{VALUE} is not a valid payment status",
      },
      default: "pending",
    },
  },
  { timestamps: true }
);

// ── Indexes ──────────────────────────────────────────────
paymentSchema.index({ order: 1 });
paymentSchema.index({ user: 1, createdAt: -1 });

// ── Hooks ────────────────────────────────────────────────
// Auto-generate a unique transaction ID before saving
paymentSchema.pre("save", function (next) {
  if (!this.transactionId) {
    this.transactionId = `TXN-${Date.now()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
  }
  next();
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
