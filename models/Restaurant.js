const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    name: String,
    address: String,
    minPrice: Number,
    maxPrice: Number,
    cuisineType: String,
    description: String,
    stars: String,
    standing: String,
    greenTouch: String,
    openingHours: String,
    phoneNumber: String,
    website: String,
    coordinates: Array,
    department: String,
    picture: {
      type: String,
      default:
        "https://d3h1lg3ksw6i6b.cloudfront.net/guide/placeholder/pic_poilist_default_1.jpg",
    },
  },

  { timestamps: true }
);

const RestaurantModel = mongoose.model("restaurant", restaurantSchema);

module.exports = RestaurantModel;
