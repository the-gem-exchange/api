var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TraitSchema = new Schema({

  name:{
    type: String,
    required: "Trait name required."
  },
  description:String,
  type:String,
  subtype:String,
  rarity:String,
  image:String,

});

module.exports = mongoose.model('Trait', TraitSchema);
