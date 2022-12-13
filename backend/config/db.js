const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.mongo_uri);

module.exports = { connection };
