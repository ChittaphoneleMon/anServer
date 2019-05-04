var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  proName: {
    type: String,
    required: "ProductName Required",
    trim: true,
    unique: true
  },
  category: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner", "Drink"],
    required: true
  },
  price: {
    type: Number,
    required: "Required Price",
    trim: true
  },
  imgName: {
    type: String,
    required: "Required img",
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

var product = mongoose.model("products", productSchema);
module.exports = product;