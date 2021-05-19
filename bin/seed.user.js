require("dotenv").config();
require("./../../configs/mongo"); 

const UserModel = require("./../models/User");
const RestaurantModel = require("./../models/Restaurant");
const { IncomingMessage } = require("http");

// const xxxxx = []
/*const userSchema = new Schema(
  {
    isAdmin: Boolean,
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if(!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: String,
    address: String,
    favoris: [{ type: Schema.Types.ObjectId, ref: "restaurant" }],
  },
  { timestamps: true }
);*/

let users = [
    {
    isAdmin: true,
    firstName: 'Quentin',
    lastName: 'Chauvat',
    email: 'quentin.chauvat@ieseg.fr',
    password: '$2a$10$sbs8aj1Q1PrGKhMkkyGvSOeRCubDzCr1JlVkpgsGt3ys3nGn2fngK',
    address: '3 rue camille tahan Paris 75018',
    favoris: [],
    },
    {
        isAdmin: true,
        firstName: 'Stephane',
        lastName: 'Mbesse',
        email: 'stephane.mbesse@gmail.com',
        password: '$2a$10$sbs8aj1Q1PrGKhMkkyGvSOeRCubDzCr1JlVkpgsGt3ys3nGn2fngK',
        address: '3 rue camille tahan Paris 75018',
        favoris: [],
        }
]