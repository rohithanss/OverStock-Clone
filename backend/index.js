const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;
const { connection } = require("./config/db");
const { adminRouter } = require("./routers/admin.router");
const { userRouter } = require("./routers/user.router");
const { productRouter } = require("./routers/products.router");
const { cartRouter } = require("./routers/cart.router");
const { wishlistRouter } = require("./routers/wishlist.router");
const { orderRouter } = require("./routers/orders.router");

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "<h1>This is the Backend for the construct Week B21. Project: overstock.com(fluffy-cough-192)"
  );
});

app.use("/products", productRouter);
app.use("/admin", adminRouter);
app.use("/wishlist", wishlistRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);
app.listen(PORT, async () => {
  try {
    connection;
    console.log("connected to the DB");
    console.log(`Listening at PORT ${PORT} \nhttp://localhost:${PORT}`);
  } catch (err) {
    console.log(err);
    console.log("Error while connecting to the DB");
  }
});
