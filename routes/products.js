var express = require("express");
var router = express.Router();
var Products = require("../model/productModel");
var _ = require("lodash");

/* GET users listing. */
router.get("/", function(req, res, next) {
  Products.find()
    .sort({
      createdAt: -1
    })
    .then(data => {
      if (data) {
        data.forEach(item => {
          item.imgName =
            "https://anrestaurant.herokuapp.com/images/" + item.imgName;
            // item.imgName = "http://localhost:3000/images/" + item.imgName;
        });

        var datacatBF = [];
        var datacatLH = [];
        var datacatDN = [];
        var datacatDK = [];

        for (const key in data) {
          if (data[key].category == "Breakfast") {
            datacatBF.push(data[key]);
          }
          if (data[key].category == "Lunch") {
            datacatLH.push(data[key]);
          }
          if (data[key].category == "Dinner") {
            datacatDN.push(data[key]);
          }
          if (data[key].category == "Drink") {
            datacatDK.push(data[key]);
          }
        }

        res.send({
          data,
          datacatBF,
          datacatDK,
          datacatDN,
          datacatLH,
          message: "success",
          statuscode: 200
        });
      } else {
        res.send({
          message: "invalid"
        });
      }
    })
    .catch(err => {
      res.send(err);
    });
});

router.post("/save", function(req, res, next) {
  var dataAll = {
    proName: req.body.proName,
    category: req.body.catName,
    price: req.body.price,
    imgName: req.body.image.substring(12)
  };

  var doc = new Products(dataAll);
  doc
    .save()
    .then(data => {
      if (data) {
        res.send({
          message: "success"
        });
      }
    })
    .catch(err => {
      res.send(err);
    });
});

// upload
router.post("/upLoadfile", function(req, res, next) {
  var file = req.files.image;
  var path = "public/images/" + file.name;

  file.mv(path, err => {
    if (err)
      res.send({
        messageUpload: "Upload NOT Complete"
      });
    res.send({
      messageUpload: "Upload Success",
      rescode: 200
    });
  });
});

router.post("/edit", function(req, res, next) {
  //console.log(req.body)
  var dataEdit = [];

  if (req.body.image == undefined) {
    dataEdit = {
      proName: req.body.proNameEdit,
      category: req.body.categoryEdit,
      price: req.body.priceEdit
    };
  } else {
    dataEdit = {
      proName: req.body.proNameEdit,
      category: req.body.categoryEdit,
      price: req.body.priceEdit,
      imgName: req.body.image
    };
  }

  Products.findByIdAndUpdate(req.body.id, dataEdit)
    .then(editResult => {
      if (editResult) {
        res.send({
          messageDetailEdit: "Edit Success",
          rescode: 200
        });
      } else {
        res.send({
          messageDetailEdit: "Cannot find Data",
          rescode: 99
        });
      }
    })
    .catch(errProEdit => {
      res.send({
        messageDetailEdit: errProEdit,
        rescode: 99
      });
    });
});

router.get("/delete/:id", (req, res, next) => {
  console.log(req.params);
  Products.findByIdAndRemove(req.params.id)
    .then(result => {
      if (result) {
        res.send({
          messageDetailDelete: "Delete Success",
          statusCode: 200
        });
      } else {
        res.send({
          messageDetailDelete: "Cannot find Data",
          statusCode: 99
        });
      }
    })
    .catch(errProEdit => {
      res.send({
        messageDetailDelete: errProEdit,
        statusCode: 99
      });
    });
});

module.exports = router;
