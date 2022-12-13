const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: String,
  image: String,
  price: Number,
  ratings: Number,
  adminId: String,
  otherImages: [String],
  category: String,
  soldBy: String,
  stock: Number,
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
