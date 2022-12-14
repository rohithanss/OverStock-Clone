const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    quantity: Number,
    totalPrice: Number,
    orderStatus: String,
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = { OrderModel };
