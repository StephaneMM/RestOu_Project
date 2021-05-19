require("dotenv").config();
require("./../../configs/mongo"); 

const UserModel = require("./../models/User");
const RestaurantModel = require("./../models/Restaurant");
const ReviewModel = require("./../models/Review");

/*const reviewSchema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "user" },
      restaurantId: { type: Schema.Types.ObjectId, ref: "restaurant" },
      note: Number,
      comment: String,
    },
    { timestamps: true }
  ); */

let reviews = [
    {
        userId: '60a4dedd68a7e813805e9403',
        restaurantId: '60a51247d04dac5cac21a614',
        note: 4,
        comment: "Très bon restaurant, mérite une étoile",
        createdAt: '2021-05-19T09:48:13.566+00:00',
        updatedAt: '2021-05-19T09:48:13.566+00:00',
        __v: 0,
    },
    {
        userId: '60a4dedd68a7e813805e9403',
        restaurantId: '60a51247d04dac5cac21a614',
        note: 4,
        comment: "Très bon restaurant, mérite une étoile",
        createdAt: '2021-05-19T09:48:13.566+00:00',
        updatedAt: '2021-05-19T09:48:13.566+00:00',
        __v: 0,
    },
    
]