const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const WishlistModel = mongoose.model("wishlist", wishlistSchema);

module.exports = { WishlistModel };
