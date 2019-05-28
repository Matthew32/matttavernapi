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
  content: {
    type:String
  },
  tags: {
    type:String
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'posts'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  subcomments: {
    type : Schema.Types.ObjectId,
    ref: 'subcomments'
  },
  ratecomments: {
    type : Schema.Types.ObjectId,
    ref: 'ratecomments'
  },



}, {
  versionKey: false, // You should be aware of the outcome after set to false
  timestamps: true

});

module.exports = mongoose.model('comments', modelSchema);
