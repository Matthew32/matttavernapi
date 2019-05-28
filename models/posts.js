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
  content: {
    type:String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  comments: {
    type : Schema.Types.ObjectId,
    ref: 'comments'
  },

}, {
  versionKey: false, // You should be aware of the outcome after set to false
  timestamps: true
});

module.exports = mongoose.model('posts', modelSchema);
