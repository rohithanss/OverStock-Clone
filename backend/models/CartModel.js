const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  quantity: Number,
  totalPrice: Number,
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const CartModel = mongoose.model("cart", cartSchema);

module.exports = { CartModel };
