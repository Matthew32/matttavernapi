var mongoose = require('mongoose');

var Schema = mongoose.Schema,
modelSchema;

modelSchema = new Schema({
  id_users: {
    type:String
  },
  metaname:{
    type:String
  },
  metavalue:{
    type:String
  }

}, {
  versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('usersmeta', modelSchema);
