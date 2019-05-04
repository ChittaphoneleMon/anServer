var express = require("express");
var router = express.Router();
var orderBill = require("../model/orderBillModel");
var orderBillDetail = require("../model/orderDetailModel");

/* GET users listing. */
router.post("/", function(req, res, next) {
  req.body.createdAt = {
    $gte: new Date().toLocaleDateString()
  };
  // console.log(req.body);
  orderBill
    .find(req.body)
    .then(result => {
      res.send({
        result,
        message: "Success",
        statuscode: 200
      });
    })
    .catch(err => {
      res.send(err);
    });
});

router.get("/list", function(req, res, next) {
  createdAt = {
    $gte: new Date().toLocaleDateString()
  };
  // console.log();
  orderBill
    .find({ createdAt: createdAt })
    .then(result => {
      res.send({
        result,
        message: "Success",
        statuscode: 200
      });
    })
    .catch(err => {
      res.send(err);
    });
});

router.get("/detailBill/:id", function(req, res, next) {
  orderBillDetail
    .find({
      billnumber: req.params.id
    })
    .then(result => {
      res.send({
        result,
        message: "Success",
        statuscode: 200
      });
    })
    .catch(err => {
      res.send(err);
    });
});

router.post("/save", (req, res, next) => {
  let sum = 0;
  for (const key in req["body"]["carts"]) {
    sum +=
      req["body"]["carts"][key].price * req["body"]["carts"][key].qty_in_cart;
  }

  var dataAll = {
    customer: req.body.customerDeteil.customer,
    id: req.body.customerDeteil.id,
    price: sum,
    status: "Order"
  };

  var doc = new orderBill(dataAll);
  doc
    .save()
    .then(data => {
      if (data) {
        let arrOrder = [];

        req.body.carts.forEach(item => {
          var qeury = {
            billnumber: data.billnumber,
            proName: item.proName,
            price: item.price,
            qty: item.qty_in_cart
          };
          arrOrder.push(qeury);
        });

        orderBillDetail
          .insertMany(arrOrder)
          .then(result => {
            if (result) {
              res.send({
                message: "success",
                statuscode: 200
              });
            }
          })
          .catch(err => {
            if (err) res.send(err);
          });
      }
    })
    .catch(err => {
      res.send(err);
    });
});
module.exports = router;
