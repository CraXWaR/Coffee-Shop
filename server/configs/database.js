const mongoose = require("mongoose");
require("dotenv").config();

function initDatabase() {
  mongoose.set("strictQuery", false);
  return mongoose.connect("mongodb://0.0.0.0:27017/coffeeShop");
}

module.exports = initDatabase;
