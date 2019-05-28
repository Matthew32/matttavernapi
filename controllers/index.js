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


exports.login = function (req, res) {

  var users = require('../models/users');
  users.findOne({ 'email': req.body.email, validado: true }, ['password', 'email', 'avatar']).populate('role').exec(function (err, user) {
    if (err || !user) {
      return res.status(404).json({ message: " user not found " });
    } else {
      if (req.body.email == user.email) {
        if (!user.validPassword(req.body.password, user.password)) {
          return res.status(402).json({ error: "password is not valid" });

        } else {
          // password matched. proceed forward
          token = exports.newToken(user.id);

          refresh_token = exports.newRefreshToken(user.id);

          delete user.password;

          console.log(user);

          return res.json({
            access_token: token,
            refresh_token: refresh_token,
            user: user
          });
        }
      } else {

        return res.json({ message: "user not found" });
      }

    }
  })
};

