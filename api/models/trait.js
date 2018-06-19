const mongoose = require('mongoose');

const Schema   = mongoose.Schema;

const TraitSchema = new Schema({

  name: {
    type: String,
    required: 'Trait name required.'
  },
  description: String,
  type: String,
  species: String,
  sex: String,
  subtype: String,
  rarity: String,
  image: String,

});

module.exports = mongoose.model('Trait', TraitSchema);
