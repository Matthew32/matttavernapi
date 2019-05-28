var roles = require('../models/roles');
var users = require('../models/users');

exports.dataUser = function (req, res, next) {

  if (req.user != null) {

    if (req.user.user != null) {
      req.user.hasRole = function (roleName, done) {
        if (roleName.constructor !== Array) {
          roleName = [roleName];
        }
        if (roleName.length > 0) {
          users.findOne({ _id: req.user.user }).populate("role").exec(function (err, user) {
            if (err || !user) return done(true, false);

            if (roleName.includes(user.role.name) != false) {
              return done(false, user.role.name);
            } else {
              return done(false, false);
            }
          });
        } else {
          return done(false, false);
        }
      }
    }
  }
  next();
};
