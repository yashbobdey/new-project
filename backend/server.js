const mongoose = require("mongoose");
const app = require("./app");
const port = 3000;
const DB = `mongodb://localhost:27017/test`;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection to database successful!");
  });
app.listen(port, () => console.log(`Running on port ${port}`));
