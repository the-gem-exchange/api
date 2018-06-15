const mongoose = require('mongoose');

const Schema   = mongoose.Schema;

const TraitSchema = new Schema({

  name: {
    type: String,
    required: 'Trait name required.'
  },
  description: String,
  type: String,
  subtype: String,
  rarity: String,
  image: String,

});

module.exports = mongoose.model('Trait', TraitSchema);
