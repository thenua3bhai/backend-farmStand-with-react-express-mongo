//this is script file to put data in db this seperate from web app ie. web app run

//it will make new entry in db so run only when need to make entry otherwise don't run this script, mongo connection code available in index.js which can run when we need to up this backend

const mongoose = require("mongoose");
const Product = require("./models/product");
main().catch((err) => {
  console.log("OH No Mongo ERROR");
  console.log(err);
}); //Starting mongo from here

async function main() {
  await mongoose.connect("mongodb://localhost:27017/farmStand"); //it will check and connect to farmStand db if not found then it will create for us
  console.log("Hello i am MONGO is running");

  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

const p = new Product({ name: "Mangoes", price: 3.2, category: "fruit" });
p.save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
