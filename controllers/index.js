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


exports.login = function(req,res){

  var users = require('../models/users');
  users.findOne({ 'username': req.params.username,'password':req.params.password }, function (err, user) {
   
    if(err){
      res.json({message: "not found " + req.params.id});
    }else{
      if (req.body.username==user.username || req.body.password==user.password) {
        if (!user.validPassword(req.body.password)) {
          res.json({message: "password is not valid" });

        } else {
          // password matched. proceed forward
        
        var token=jwt.sign({
        user:user.id
              },jwtClave);

              res.json({token});
            }
       }else {

        res.json({message: "user not found" });
       }

    }
  } )
};
