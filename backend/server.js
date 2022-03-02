require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");
const DB = `mongodb://localhost:27017/${process.env.DB_NAME}`;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection to database successful!");
  });
app.listen(process.env.PORT || 5000, () =>
  console.log(`Running on port ${process.env.PORT}`)
);
