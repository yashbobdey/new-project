const User = require("../models/User.js");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  let querys = {};
  const pageSize = 10;
  if (req.query.keyword) {
    querys.$or = [
      { userName: { $regex: req.query.keyword, $options: "i" } },
      { userInterest: { $regex: req.query.keyword, $options: "i" } },
    ];
  }

  const page = parseInt(req.query.page || "0");
  const total = await User.countDocuments({});
  console.log(querys);
  const users = await User.find(querys)
    .limit(pageSize)
    .skip(pageSize * page);
  res.status(201).json({
    status: "success",
    users: users,
    totalPages: Math.ceil(total / pageSize),
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next({
      status: 400,
      message: "user not found",
    });
  }
  res.status(201).json({
    status: "success",
    data: user,
  });
});

exports.addUser = asyncHandler(async (req, res, next) => {
  console.log("request body: ", req.body);
  console.log(req.file);
  const user = await User.findOne({ userName: req.body.userName });
  if (user) {
    return next(
      new AppError("Username already exists! Please use another Username!", 400)
    );
  }
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: newUser,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user_id = req.params.id;
  console.log("user id : ", user_id);
  const updatedUser = await User.findByIdAndUpdate(user_id, req.body, {
    new: true,
    runValidators: true,
  });
  console.log("updated user : ", updatedUser);

  res.status(201).json({
    status: "success",
    data: updatedUser,
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Deleted Successfully!",
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  let { userName, password } = req.body;

  if (!userName) return next(new AppError("Please provide username!", 401));
  let user = await User.findOne({ userName });

  if (!user) {
    return next(new AppError("Username provided is wrong.", 401));
  }

  let verified = await user.matchPasswords(password);
  if (!verified)
    // return next({ status: 401, message: "Password provided is wrong!!" });
    return next(new AppError("Password Provided is wrong.", 401));
  let token = user.getSignedJwtToken(user._id);
  console.log("token: ", token);
  res.status(200).json({
    status: "successfully Signed in!",
    token: token,
    user,
  });
});
