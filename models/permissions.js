var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    modelSchema;

modelSchema = new Schema({
  slug: {
    type:String
  },
  action:{
    type:String
  }
}, {
  versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('permissions', modelSchema);
