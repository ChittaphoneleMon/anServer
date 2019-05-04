var express = require("express");
var router = express.Router();
var Users = require("../model/userModel");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

// login Users
router.post("/signin", function(req, res, next) {
  Users.findOne({
    username: req.body.email,
    password: req.body.password
  })
    .then(result => {
      if (result === null) {
        res.send({ userData: "invalid data" });
      } else {
        res.send({ userData: result, resCode: 200 });
      }
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
