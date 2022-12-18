const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenValidator = require("../middlewares/tokenAuth");
const { UserModel } = require("../models/UserModel");
// const { ProductModel } = require("../models/ProductModel");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  let payload = req.body;
  if (
    payload.email == undefined ||
    payload.password == undefined ||
    payload.name == undefined
  ) {
    res.send({ msg: "some fields are missing", status: "fail" });
    return;
  }
  let userExist = await UserModel.findOne({ email: payload.email });
  if (userExist != null) {
    res.send({ msg: "user already exists", status: "fail" });
  } else {
    try {
      let user = new UserModel(payload);
      bcrypt.hash(payload.password, 5, (err, hash) => {
        if (err) {
          res.send({ msg: "some while registering", status: "error" });
        } else {
          user.password = hash;
          user.save();
          res.send({ msg: "signup successful", status: "success" });
        }
      });
    } catch (err) {
      res.send({ msg: "some while registering", status: "error" });
    }
  }
});

userRouter.post("/login", async (req, res) => {
  let payload = req.body;

  let user = await UserModel.findOne({ email: payload.email });
  if (user == null) {
    res.send({ msg: "Wrong Credentials", status: "fail" });
  } else {
    try {
      bcrypt.compare(payload.password, user.password, async (err, result) => {
        if (err) {
          console.log(err);
          res.send({
            msg: "Some error occurred while logging in, try again later",
            status: "error",
          });
        } else {
          if (result) {
            let authId = user._id;
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

userRouter.use(tokenValidator);

userRouter.get("/myprofile", async (req, res) => {
  try {
    let profile = await UserModel.findOne({ _id: req.body.authId });

    // await profile.cart[0].populate("productId");
    console.log(profile);
    res.send({
      full_name: profile.name,
      email: profile.email,
      mobile: profile.mobile,
      address: profile.address,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Error at fetching profile", status: "error" });
  }
});

module.exports = { userRouter };
