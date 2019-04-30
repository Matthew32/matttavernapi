var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    userSchema;

userSchema = new Schema({
  id: {
    type:String
  },
  id_hourstypes:{
    type:String
  }

}, {
  versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('users', userSchema);
