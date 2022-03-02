const User = require("../models/User");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const protect = async (req, res, next) => {
  //   console.log(req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // console.log(req);
    const token = req.headers.authorization.split(" ")[1];
    console.log("token (protect) : ", token);

    try {
      var decoded = jwt.verify(token, "this-is-a-secret-key");
      console.log("decoded token (protect) : ", decoded);
      let user = await User.findById(decoded.id);
      req.user = user;
      console.log("Found user", user);
      if (user) next();
    } catch (err) {
      return next(new AppError("Token Invalid!!", 401));
      // { status: 401, message: "Token Invalid!!" }
    }
  } else {
    return next(new AppError("No token sent!!", 401));
    // { status: 401, message: "No token sent!!" }
  }
};
module.exports = protect;
