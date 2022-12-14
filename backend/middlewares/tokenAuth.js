const jwt = require("jsonwebtoken");
require("dotenv").config();

function tokenValidator(req, res, next) {
  let token = req.headers.authorization?.split(" ")[1];
  try {
    let decoded = jwt.verify(token, process.env.secret_key);

    req.body.authId = decoded.authId;
    next();
  } catch (err) {
    res.send({ msg: "login again", status: "fail", err });
  }
}

module.exports = tokenValidator;
