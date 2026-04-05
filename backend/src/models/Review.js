import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: [true, "Restaurant is required"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [500, "Comment cannot exceed 500 characters"],
    },
  },
  { timestamps: true }
);

// ── Indexes ──────────────────────────────────────────────
// One review per user per restaurant
reviewSchema.index({ user: 1, restaurant: 1 }, { unique: true });
reviewSchema.index({ restaurant: 1, createdAt: -1 });

// ── Statics ──────────────────────────────────────────────
// Calculate and update the average rating on the Restaurant model
reviewSchema.statics.calcAverageRating = async function (restaurantId) {
  const result = await this.aggregate([
    { $match: { restaurant: restaurantId } },
    {
      $group: {
        _id: "$restaurant",
        avgRating: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);

  const Restaurant = mongoose.model("Restaurant");

  if (result.length > 0) {
    await Restaurant.findByIdAndUpdate(restaurantId, {
      rating: Math.round(result[0].avgRating * 10) / 10,
      numReviews: result[0].count,
    });
  } else {
    await Restaurant.findByIdAndUpdate(restaurantId, {
      rating: 0,
      numReviews: 0,
    });
  }
};

// Recalculate rating after save / remove
reviewSchema.post("save", function () {
  this.constructor.calcAverageRating(this.restaurant);
});

reviewSchema.post("findOneAndDelete", function (doc) {
  if (doc) {
    doc.constructor.calcAverageRating(doc.restaurant);
  }
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
