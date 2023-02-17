const express = require("express");
const app = express(); //for execution of express
const path = require("path");
const Product = require("./models/product");

const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

main().catch((err) => {
  console.log("OH No Mongo ERROR");
  console.log(err);
}); //Starting mongo from here

async function main() {
  await mongoose.connect("mongodb://localhost:27017/farmStand"); //it will check and connect to farmStand db if not found then it will create for us
  console.log("Hello i am MONGO is running");

  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/products", async (req, res) => {
  console.log("calling to db");
  const products = await Product.find({});
  console.log("data received, call succesfull");
  res.send({ products });
});
app.post("/products", async (req, res) => {
  console.log("Data Received", req.body);
  console.log("calling to db");
  const product = new Product(req.body);
  await product.save();
  console.log("Data inserted successfully", product);
  res.redirect(`/`);
});
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(id);
  console.log("product deleted successfully", deletedProduct);
  res.redirect(303, "/");
});
app.put("/products/edit/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  console.log("product edited successfully", product);
  // res.redirect(303, `/${product._id}`);
});

app.listen(5000, () => {
  console.log("App is listening at 5000 port");
});
