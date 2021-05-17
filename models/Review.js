const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    restaurantId: { type: Schema.Types.ObjectId, ref: "restaurant" },
    note: Number,
    comment: String,
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model("review", reviewSchema);

module.exports = ReviewModel;
