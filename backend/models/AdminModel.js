const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
  ],
  customers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
  ],
});

const AdminModel = mongoose.model("admin", adminSchema);

module.exports = { AdminModel };
