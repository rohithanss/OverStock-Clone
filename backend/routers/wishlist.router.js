const { Router } = require("express");

const { UserModel } = require("../models/UserModel");
const { WishlistModel } = require("../models/WishlistModel");
const tokenValidator = require("../middlewares/tokenAuth");

const wishlistRouter = Router();

wishlistRouter.use(tokenValidator);

wishlistRouter.post("/add/:productId", async (req, res) => {
  let productId = req.params.productId;
  let userId = req.body.authId;
  try {
    let item = await WishlistModel.create({ productId, userId });
    await UserModel.findByIdAndUpdate(
      { _id: userId },
      { $push: { wishlist: item._id } }
    );
    res.send({
      msg: "Product added to wishlist successfully",
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.send({
      msg: "Error while adding product to the wishlist, try again later",
      status: "error",
    });
  }
});

wishlistRouter.get("/", async (req, res) => {
  const userId = req.body.authId;

  try {
    let wishlist = await WishlistModel.find({ userId }).populate("productId");

    res.send({ status: "success", data: wishlist });
  } catch (err) {
    res.send({ msg: "error while fetching wishlist items", status: "error" });
  }
});

wishlistRouter.delete("/delete/:wishlistId", async (req, res) => {
  const userId = req.body.authId;
  const wishlistId = req.params.wishlistId;
  try {
    let item = await WishlistModel.findOneAndDelete({
      _id: wishlistId,
      userId,
    });
    if (item != null) {
      res.send({ msg: "Item deleted successfully", status: "success" });
    } else {
      res.send({ msg: "Invalid operation", status: "fail" });
    }
  } catch (err) {
    res.send({ msg: "error while updating data", status: "error" });
  }
});

module.exports = { wishlistRouter };
