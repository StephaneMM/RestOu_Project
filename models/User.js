const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    isAdmin: Boolean,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    address: String,
    favoris: [{ type: Schema.Types.ObjectId, ref: "restaurant" }],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
