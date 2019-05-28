/**
 * do something with the role model
 * var role = require('../models/role');
 */
var model = require('../models/roles');

exports.list = function (req, res) {
    model.find(function(err, response){
    res.json(response);
 });
}
exports.filter = function (req , res ){
    model.findById(req.params.id, function (err, role) {
    if(err) res.json({message: "not found " + req.params.id});
    else res.json({role});
   } );
};
exports.create = function (req , res ){
  model.create(req.body, function (error, valid) {
    if(err)
      res.json("error");
    else
      res.json(role);
  });
}
exports.edit = function (req , res ){
    model.findByIdAndUpdate(req.params.id, req.body, function(err, response){
    if(err) res.json({message: "Error in updating person with id " + req.params.id});
    res.json(response);
  });

};

exports.remove = function (req, res){
    model.findByIdAndRemove(req.params.id, function(err, response){
    if(err) res.json({message: "Error in deleting record id " + req.params.id});
    else res.json({message: "Person with id " + req.params.id + " removed."});
 });
}

