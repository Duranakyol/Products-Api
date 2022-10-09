const express = require("express");
const productsRouter = require("./routes/products");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017", (e) => {
  if (e) {
    console.log(e);
  } else {
    console.log("Connected to database");
  }
});

const isLoggedIn = true;

app.use((req, res, next) => {
  if (!isLoggedIn) {
    res.send("You must be logged in to view this Page");
  } else {
    next();
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/products", productsRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
