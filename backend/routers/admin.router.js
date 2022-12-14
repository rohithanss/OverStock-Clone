const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenValidator = require("../middlewares/tokenAuth");
const { AdminModel } = require("../models/AdminModel");
const { ProductModel } = require("../models/ProductModel");
const { OrderModel } = require("../models/OrderModel");
const { UserModel } = require("../models/UserModel");
const { reset } = require("nodemon");

const adminRouter = Router();

adminRouter.post("/login", async (req, res) => {
  let payload = req.body;

  let admin = await AdminModel.findOne({ email: payload.email });
  if (admin == null) {
    res.send({ msg: "Wrong Credentials", status: "fail" });
  } else {
    try {
      bcrypt.compare(payload.password, admin.password, async (err, result) => {
        if (err) {
          console.log(err);
          res.send({
            msg: "Some error occurred while logging in, try again later",
            status: "error",
          });
        } else {
          if (result) {
            let authId = admin._id;
            let token = jwt.sign({ authId }, process.env.secret_key);

            res.send({ msg: "log in success", status: "success", token });
          } else {
            res.send({ msg: "Wrong Credentials", status: "fail" });
          }
        }
      });
    } catch (err) {
      console.log(err);
      res.send({
        msg: "Some error occurred while logging in, try again later",
        status: "error",
      });
    }
  }
});

adminRouter.use(tokenValidator);

adminRouter.get("/myprofile", async (req, res) => {
  try {
    let profile = await AdminModel.findOne({ _id: req.body.authId });

    res.send({ full_name: profile.name, email: profile.email });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Error at fetching profile", status: "error" });
  }
});

// --------------------ORDERS ENDPOINTS

adminRouter.get("/orders", async (req, res) => {
  const adminId = req.body.authId;
  let limit = req.query.limit || null;
  let skip = (req.query.page - 1) * limit;
  let orderStatus = req.query.status;
  // let sort = req.query.sort || -1;
  console.log(orderStatus);
  try {
    let orders = await OrderModel.find({
      $and: [{ adminId }, { orderStatus: { $regex: orderStatus } }],
    })
      // .sort({ updatedAt: sort })
      .limit(limit)
      .skip(skip)
      .populate("productId");
    // console.log(orders, "dfgd");
    res.send({ orders, status: "success" });
  } catch {
    res.send({ msg: "Error while fetching orders", status: "error" });
  }
});

adminRouter.patch("/orders/:orderId", async (req, res) => {
  let orderStatus = req.query.status;
  let _id = req.params.orderId;
  try {
    await OrderModel.findByIdAndUpdate({ _id }, { orderStatus });
    res.send({ msg: "order status updated successfully", status: "success" });
  } catch (err) {
    res.send({ msg: "error while updating the order status", status: "error" });
  }
});

adminRouter.get("/customer/:userID", async (req, res) => {
  let userID = req.params.userID;
  try {
    let customer = await UserModel.findById({ _id: userID });
    // console.log(customer);
    res.send({
      full_name: customer.name,
      email: customer.email,
      status: "success",
    });
  } catch (err) {
    res.send({ msg: "error while fetching customer details", status: "error" });
  }
});
// --------------------PRODUCTS ENDPOINTS

adminRouter.get("/products", async (req, res) => {
  let limit = req.query.limit || null;
  let skip = (req.query.page - 1) * limit;

  try {
    let products = await ProductModel.find({ adminId: req.body.authId })
      .limit(limit)
      .skip(skip);
    let totalProducts = await ProductModel.countDocuments();
    res.send({
      status: "success",
      products,
      totalProducts,
    });
  } catch (err) {
    console.log(err);
    res.send({ msg: "error while fetching products", status: "error" });
  }
});

adminRouter.patch("products/update/:productId", async (req, res) => {
  const _id = req.params.productId;
  const payload = req.body;

  try {
    let resp = await ProductModel.findById({ _id }, { payload });
    if (resp == null) {
      res.send({ msg: "Invalid operation updating product", status: "fail" });
    } else {
      res.send({ msg: "Product updated successfully", status: "success" });
    }
  } catch (err) {
    res.send({ msg: "Error while updating product", status: "error" });
  }
});

// ========================== EXTRA Routers =======================

adminRouter.post("/addmanyproducts", async (req, res) => {
  let payload = req.body;
  res.send({ msg: "this end is blocked temporary" });
  return;
  try {
    let profile = await AdminModel.findOne({ _id: req.body.authId });
    let products = payload.products;
    products.forEach((el) => {
      el.authId = payload.authId;
      el.soldBy = profile.name;
      el.stock = 55;
    });

    await ProductModel.insertMany(products);
    res.send({ msg: "products added successfully", status: "success" });
  } catch (err) {
    res.send({
      msg: "Error while uploading products!try again.",
      status: "error",
    });
  }
});
adminRouter.post("/updatemanyproducts", async (req, res) => {
  let payload = req.query;
  res.send({ msg: "this end is blocked temporary" });
  return;
  try {
    let resp = await ProductModel.updateMany(
      { category: payload.category },
      { $set: { stock: payload.stock } }
    );
    console.log("resp:", resp);
    res.send({ msg: "products Updated successfully", status: "success" });
  } catch (err) {
    res.send({
      msg: "Error while uploading products!try again.",
      status: "error",
    });
  }
});
module.exports = { adminRouter };
