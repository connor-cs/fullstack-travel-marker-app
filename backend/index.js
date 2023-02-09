const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

dotenv.config();
const URL = process.env.MONGO_URL

app.use(express.json());

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

mongoose.set("strictQuery", false);
mongoose
  .connect(
    URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch((err) => console.log(err));

app.listen(8800, () => {
  console.log("Backend server is running!");
});
