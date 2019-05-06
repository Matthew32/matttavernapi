var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    modelSchema;

modelSchema = new Schema({
  id: {
    type:String
  },
  title: {
    type:String
  },
  subtitle: {
    type:String
  },
  id_user: {
    type:String
  },

}, {
  versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('posts', modelSchema);
