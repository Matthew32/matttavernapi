/**
 * do something with the user model
 * var User = require('../models/user');
 */

exports.index = function (req, res) {
  res.send("Index");
};
exports.error = function (req, res) {
  res.send("Not found");
};


