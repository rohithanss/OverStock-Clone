const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  mobile: String,
  address: String,
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wishlist",
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
  ],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
    },
  ],
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
