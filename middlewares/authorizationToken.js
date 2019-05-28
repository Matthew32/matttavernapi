// middleware.js
var jwt = require('jwt-simple');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var unless = ["/login", "/signup", "/sendPasswordResetLink", "/resetPassword", "/refresh", "/validar"];

exports.ensureAuthenticated = function (req, res, next) {
  if (unless.indexOf(req.originalUrl) < 0) {
    if (!req.headers.authorization) {
      return res
        .status(403)
        .send({ message: "Tu petición no tiene cabecera de autorización" });
    }
    try {
      var token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.API_KEY, function(err, payload) {
        if(err && err.name == "TokenExpiredError") return res.status(401).send({ message: "Token Expired" });
        if(err) return res.status(401).send({ message: err });

        req.user = { user: payload.user };
        next();
      });
    } catch (e) {
      return res.status(403).send({ message: "Error en token" });
    }
  } else {
    next();
  }
}
