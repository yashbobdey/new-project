// importing libraries
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

//Error Handling
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./middlewares/errorControler");

//Routers
const userRouter = require(`./routes/User`);

// ----------------------------------  app ----------------------------
const app = express();

//----------------------------------- middlewares ---------------------

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//------------------------------------ Routes -------------------------

app.use("/users", userRouter);

//------------------------------------ Any other Route ------------------

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ----------------------------------- Global Error Handler -----------------

app.use(globalErrorHandler);

module.exports = app;
