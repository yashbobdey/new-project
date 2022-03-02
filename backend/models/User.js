const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, " Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  },
  profile: {
    String,
  },
  generalDescription: {
    type: String,
  },
  userInterest: {
    type: String,
    required: [true, "userInterest is required"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  //console.log(this.password);
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// model method to generate jwt token .. jsonwebtoken
userSchema.methods.getSignedJwtToken = function (id) {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
      id,
    },
    "this-is-a-secret-key"
  );

  return token;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
