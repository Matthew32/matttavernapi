var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    modelSchema;

modelSchema = new Schema({
  name: {
    type:String
  },
  users: {
    type: Schema.Types.ObjectId,
    ref: 'users'
},

}, {
  versionKey: false, // You should be aware of the outcome after set to false
  timestamps: true

});

module.exports = mongoose.model('roles', modelSchema);
