const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;
const { connection } = require("./config/db");
const { adminRouter } = require("./routers/admin.router");

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "<h1>This is the Backend for the construct Week B21. Project: overstock.com(fluffy-cough-192)"
  );
});

app.use("/admin", adminRouter);

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
