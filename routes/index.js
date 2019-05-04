var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/qr", function(req, res, next) {
  res.send({
    qr: "https://anrestaurant.herokuapp.com/images/QR.png",
    // qr: "http://localhost:3000/images/QR.png",
    status: "success"
  });
});

module.exports = router;
