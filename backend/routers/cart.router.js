const { Router } = require("express");

const { UserModel } = require("../models/UserModel");
const { ProductModel } = require("../models/ProductModel");
const { CartModel } = require("../models/CartModel");
const tokenValidator = require("../middlewares/tokenAuth");

const cartRouter = Router();

cartRouter.use(tokenValidator);

cartRouter.post("/add/:productId", async (req, res) => {
  let productId = req.params.productId;
  let userId = req.body.authId;
  let quantity = req.query.quantity;

  try {
    let { price } = await ProductModel.findById({ _id: productId });
    totalPrice = price * quantity;
    let cartItem = await CartModel.create({
      quantity,
      totalPrice,
      productId,
      userId,
    });

    await UserModel.findByIdAndUpdate(
      { _id: userId },
      { $push: { cart: cartItem._id } }
    );

    res.send({ msg: "Product added to cart successfully", status: "success" });
  } catch (err) {
    res.send({
      msg: "Error while adding product to the cart, try again later",
      status: "error",
    });
  }
});

cartRouter.get("/", async (req, res) => {
  const userId = req.body.authId;

  try {
    let cart = await CartModel.find({ userId }).populate("productId");
    res.send({ status: "success", data: cart });
  } catch (err) {
    res.send({ msg: "error while fetching cart items", status: "error" });
  }
});

cartRouter.patch("/update/:cartId", async (req, res) => {
  const userId = req.body.authId;
  const cartId = req.params.cartId;
  const quantity = req.query.quantity;
  try {
    let item = await CartModel.findOne({ _id: cartId, userId });
    if (item != null) {
      let totalPrice = (item.totalPrice / item.quantity) * quantity;
      await CartModel.findByIdAndUpdate(
        { _id: cartId },
        { totalPrice, quantity }
      );

      res.send({ msg: "cart updated successfully", status: "success" });
    } else {
      res.send({ msg: "Invalid operation", status: "fail" });
    }
  } catch (err) {
    res.send({ msg: "error while updating data", status: "error" });
  }
});

cartRouter.delete("/delete/:cartId", async (req, res) => {
  const userId = req.body.authId;
  const cartId = req.params.cartId;
  try {
    let item = await CartModel.findOneAndDelete({ _id: cartId, userId });
    if (item != null) {
      res.send({ msg: "Item deleted successfully", status: "success" });
    } else {
      res.send({ msg: "Invalid operation", status: "fail" });
    }
  } catch (err) {
    res.send({ msg: "error while updating data", status: "error" });
  }
});

module.exports = { cartRouter };
