var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var moment = require('moment');


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
    type:String,
    select: false
  },
  email:{
    type:String
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'roles'
  },
  posts: {
    type: Schema.Types.ObjectId,
    ref: 'posts'
  },
}, {
  versionKey: false, // You should be aware of the outcome after set to false
  timestamps: true
});
// hash the password
userSchema.methods.generateHash = function (password) {
  bcrypt.hash(password, parseInt(process.env.PASSWORD_SALT))
  .then(function(hashedPassword) {
    return hashedPassword;
  }).catch(function(e){
  return -1;
  })

};

// checking if password is valid
userSchema.methods.validPassword = function (passwordToCheck,passwordToMatch) {
  if(bcrypt.compareSync(passwordToCheck, passwordToMatch)) {
    // Passwords match
    return true;
   } else {
    // Passwords don't match
    return false;
  }

};



userSchema.pre("save", function (next) {
  // store reference
  const user = this;
  if (user.password === undefined) {
      return next();
  }
  bcrypt.hash(user.password, parseInt(process.env.PASSWORD_SALT))
  .then(function(hashedPassword) {
    user.password  = hashedPassword;
    return next();
  }).catch(function(e){
    return next();
  })


});
userSchema.pre("findByIdAndUpdate", function (next) {
  // store reference
  const user = this;
  if (user.password === undefined) {
      return next();
  }
  bcrypt.hash(user.password, parseInt(process.env.PASSWORD_SALT))
  .then(function(hashedPassword) {
    user.password  = hashedPassword;
    return next();
  }).catch(function(e){
    return next();
  })
});

userSchema.pre("find", function (next) {
  // store reference
  const user = this;

  if (user.birthdate === undefined) {
      return next();
  }
  user.birthdate =moment(user.birthdate).format('YYYY-MM-DD');

  return next();


});
userSchema.pre("findOne", function (next) {
  // store reference
  const user = this;

  if (user.birthdate === undefined) {
      return next();
  }
  user.birthdate = moment(user.birthdate).format('YYYY-MM-DD');
  return next();
});

userSchema.post('init', function(doc) {
  if(this.avatar) {
    this.avatar = fs.url(doc.avatar);
  }
});


userSchema.path('email').validate(function (value, done) {
  this.model('users').count({ email: value, _id: { $not: { $eq: this._id }} }, function (err, count) {
    if (err) {
      return done(err);
    }
    // If `count` is greater than zero, "invalidate"
    done(!count);
  });
}, 'errors.email_exists');

userSchema.virtual('password_confirmation')
  .get(function () {
    return this._password_confirmation;
  })
  .set(function (value) {
    this._password_confirmation = value;
  });

userSchema.path('password').validate(function (val) {
  if (val || this._password_confirmation) {
    if (val.length < 6) {
      this.invalidate('password', 'errors.password_too_short');
    }
    if (val !== this._password_confirmation) {
      this.invalidate('password', 'errors.passwords_no_match');
    }
  }

  if (this.isNew && !val) {
    this.invalidate('password', 'errors.required');
  }
}, null);

userSchema.pre('validate', function (next) {
  if (this.password !== this.password_confirmation) {
    this.invalidate('password', 'errors.passwords_no_match');
  }
  next();
});
module.exports = mongoose.model('users', userSchema);
