const mongoose = require("mongoose");

//First define schema for model.

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: {
    type: String,
    lowercase: true,
    enum: ["fruit", "vegetable", "dairy"],
  },
});

//Now make model with this schema and export this to where we create products (mainly one by one or in whole) for collection for db

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
