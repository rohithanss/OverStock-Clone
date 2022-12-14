const { Router } = require("express");

const { OrderModel } = require("../models/OrderModel");
const { CartModel } = require("../models/CartModel");
const { ProductModel } = require("../models/ProductModel");
const { UserModel } = require("../models/UserModel");
const { AdminModel } = require("../models/AdminModel");
const tokenValidator = require("../middlewares/tokenAuth");

const orderRouter = Router();

orderRouter.use(tokenValidator);
orderRouter.post("/place", async function (req, res) {
  let userId = req.body.authId;

  try {
    let cartItems = await CartModel.find({ userId });
    cartItems.forEach(async (item) => {
      let { totalPrice, productId, quantity } = item;
      let { adminId } = await ProductModel.findById({ _id: productId });
      let orderItem = await OrderModel.create({
        userId,
        productId,
        adminId,
        quantity,
        totalPrice,
        orderStatus: "Placed",
      });
      await AdminModel.findByIdAndUpdate(
        { _id: adminId },
        { $push: { orders: orderItem._id } }
      );

      await UserModel.findByIdAndUpdate(
        { _id: userId },
        { $push: { orders: orderItem._id } }
      );

      //   console.log(orderItem);
    });
    await CartModel.deleteMany({ userId });
    res.send({ msg: "Order Placed Successfully", status: "success" });
  } catch (err) {
    res.send({ msg: "error while placing order", status: "error" });
  }
});

orderRouter.get("/", async (req, res) => {
  let userId = req.body.authId;

  try {
    let orders = await OrderModel.find({ userId }).populate(["productId"]);

    res.send({ data: orders, status: "success" });
  } catch (err) {
    res.send({ msg: "error while fetching orders details", status: "error" });
  }
});

orderRouter.patch("/return/:orderId", async (req, res) => {
  let orderId = req.params.orderId;
  let userId = req.body.authId;
  try {
    let resp = await OrderModel.findOneAndUpdate(
      { _id: orderId, userId },
      { orderStatus: "Return Request" }
    );
    if (resp != null) {
      res.send({
        msg: "order return request submitted ",
        status: "success",
      });
    } else {
      res.send({
        msg: "request failed due to invalid operation",
        status: "fail",
      });
    }
  } catch (err) {
    res.send({ msg: "Error while requesting return", status: "error" });
  }
});
orderRouter.patch("/cancel/:orderId", async (req, res) => {
  let orderId = req.params.orderId;
  let userId = req.body.authId;
  try {
    let resp = await OrderModel.findOneAndUpdate(
      { _id: orderId, userId },
      { orderStatus: "cancelled" }
    );
    if (resp != null) {
      res.send({
        msg: "order cancelled successfully ",
        status: "success",
      });
    } else {
      res.send({
        msg: "request failed due to invalid operation",
        status: "fail",
      });
    }
  } catch (err) {
    res.send({ msg: "Error while requesting cancel", status: "error" });
  }
});
module.exports = { orderRouter };
