var mongoose = require('mongoose');

var Schema = mongoose.Schema,
modelSchema;

modelSchema = new Schema({
  id_roles: {
    type:String
  },
  id_permissions:{
    type:String
  },
}, {
  versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('rolespermissions', modelSchema);
