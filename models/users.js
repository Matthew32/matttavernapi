var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    userSchema;

userSchema = new Schema({
  id: {
    type:String
  },
  username:{
    type:String
  },
  password:{
    type:String
  },
  email:{
    type:String
  }

}, {
  versionKey: false // You should be aware of the outcome after set to false
});
// hash the password
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', userSchema);
