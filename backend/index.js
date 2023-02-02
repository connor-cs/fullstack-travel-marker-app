const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
const pinRoute = require("./routes/pins")

dotenv.config()

app.use(express.json())


app.use("/api/pins/", pinRoute)

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://cyphersc:Rahowa1488@cluster0.18v6g9g.mongodb.net/travel?retryWrites=true&w=majority", {useNewUrlParser: true})
  .then(()=> {
    console.log("MongoDB Connected!")
  })
  .catch((err) => console.log(err))

  app.listen(8800, ()=> {
    console.log("Backend server is running!")
  })