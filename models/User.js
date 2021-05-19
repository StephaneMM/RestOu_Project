const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema(
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
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
