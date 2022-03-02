const AppError = require("../utils/AppError");

module.exports = (err, req, res, next) => {
  console.log("inside global error handler");
  console.log(err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  sendErrorDev(err, res);
};

const sendErrorDev = (err, res) => {
  if (err.operationalError) {
    if (err.name === "CastError") {
      err = handleCastErrorDB(err);
    }
    if (err.code === 11000) {
      err = handleDuplicateFieldDB(err);
    }
    if (err.name === "ValidationError") {
      err = handleValidationErrorDB(err);
    }
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      err,
    });
  } else {
    console.log("programming error: ", err);
    res.status(500).json({
      status: "error",
      message: "something went very wrong",
      error: err,
    });
  }
};

//**************************************************************************
//------------------------------ Mongoose/MongoDB Error Functions-----------------
//___________________________________________________________________________
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldDB = (err) => {
  const [value] = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/); //this return an array
  const message = `Duplicate Field Value: ${value}`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid Input Data: ${errors.join(". ")}`;
  return new AppError(message, 400);
};
