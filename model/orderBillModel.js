var mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

var orderBillSchema = mongoose.Schema({
  billnumber: Number,
  customer: {
    type: String,
    trim: true
  },
  id: Number,
  price: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["Order", "Confirm", "finish"],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

orderBillSchema.plugin(AutoIncrement, {
  inc_field: 'billnumber'
});
var order = mongoose.model("orderbills", orderBillSchema);
module.exports = order;