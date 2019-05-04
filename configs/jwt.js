var jwt = require("jsonwebtoken");

module.exports = {
  jwttoken(resultEnd) {
    return jwt.sign(resultEnd, "yZmuITJSvgwAe4M0x7QetA2nkZdK6t", {
      expiresIn: "24h"
    });
  },
  verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    //console.log("bearerHeader | " + bearerHeader);
    if (bearerHeader) {
      const bearer = bearerHeader.split(" ");
      //console.log("bearer | " + bearer);
      const bearerToken = bearer[1];
      //console.log("bearerToken | " + bearerToken);
      req.token = bearerToken;
      //console.log("req.token | " + req.token);
      next();
    }
  },
  jwtVeryfyToken(token) {
    return jwt.verify(token, "yZmuITJSvgwAe4M0x7QetA2nkZdK6t");
  }
};
