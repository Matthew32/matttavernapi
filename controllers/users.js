/**
 * do something with the user model
 * var User = require('../models/user');
 */
var users = require('../models/users');

exports.list = function (req, res) {
  users.find(function(err, response){
    res.json(response);
 });
}
exports.filter = function (req , res ){
  users.findById(req.params.id, function (err, user) {
    if(err) res.json({message: "not found " + req.params.id});
    else res.json({user});
   } );
};
exports.create = function (req , res ){
  var usersInfo = req.body;
  //validation here
  var userObject = new users({
    id_hourstypes:req.body.id_hourstypes
  });
  userObject.save(function(err, user){
    if(err)
      res.json("error");
    else
      res.json(user);
  });
}
exports.edit = function (req , res ){
  users.findByIdAndUpdate(req.params.id, req.body, function(err, response){
    if(err) res.json({message: "Error in updating person with id " + req.params.id});
    res.json(response);
  });

};

exports.remove = function (req, res){
  users.findByIdAndRemove(req.params.id, function(err, response){
    if(err) res.json({message: "Error in deleting record id " + req.params.id});
    else res.json({message: "Person with id " + req.params.id + " removed."});
 });
}

