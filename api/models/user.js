var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({

  name:String,

  email: {
    type: String,
    required: "Email required."
  },

  password: {
    type: String,
    required: "Password required."
  },

  facebook_uid: String,

  //
  // nickname: {
  //   type: String,
  // },
  //
  // social_links{
  //   furaffinity:String,
  //   deviantart:String,
  // }
});

module.exports = mongoose.model('User', UserSchema);
