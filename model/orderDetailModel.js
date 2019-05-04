var mongoose = require("mongoose");

var orderBillDetail = mongoose.Schema({
    billnumber: {
        type: Number,
        required: true
    },
    proName: {
        type: String,
        required: "ProductName Required",
        trim: true
    },
    price: {
        type: Number,
        required: "Required Price",
        trim: true
    },
    qty: {
        type: Number,
        required: true
    },
    c: {
        type: Date,
        default: Date.now
    }
});

var order = mongoose.model("orderbilldetails", orderBillDetail);
module.exports = order;