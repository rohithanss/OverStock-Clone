const { Router } = require("express");

const { ProductModel } = require("../models/ProductModel");

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  let query = req.query;
  console.log(query);
  var products;
  let limit = req.query.limit || null;
  let skip = (req.query.page - 1) * limit;
  try {
    if (query.category) {
      products = await ProductModel.find({
        category: { $regex: query.category, $options: "i" },
      })
        .limit(limit)
        .skip(skip);
    } else if (query.search) {
      products = await ProductModel.find({
        title: { $regex: query.search, $options: "i" },
      })
        .sort({ ratings: -1 })
        .limit(limit)
        .skip(skip);
    } else {
      products = await ProductModel.find()
        .populate("adminId")
        .sort({ ratings: -1 })
        .limit(limit ? limit : 10)
        .skip(skip ? skip : 0);
    }
    res.send({ status: "success", products });
  } catch (err) {
    res.send({ msg: "invalid search request", status: "fail" });
  }
});

productRouter.get("/:productId", async (req, res) => {
  let productId = req.params.productId;
  try {
    let product = await ProductModel.findById({ _id: productId });
    res.send({ product, status: "success" });
  } catch (err) {
    res.send({ msg: "invalid product Id", status: "fail" });
  }
});
module.exports = { productRouter };
