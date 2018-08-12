const mongoose   = require('mongoose');

const { Schema } = mongoose;

const StarDragonSchema = new Schema({
  name: {
    type: String,
    required: 'Name required.',
  },

  image: { type: String },
  image_url: { type: String },

  species: {
    type: String,
    enum: [
      'stareater',
      'starsweeper',
      'stardasher',
      'starfisher',
      'starweaver',
      'starrobber',
      'starcrafter',
      'starshooter',
      'chimera'
    ],
  },

  subSpecies: [], // An array of objects like: {type:'stardasher', subtype:'desert'}

  palette: [], // An array of strings, from a color picker probably

  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'legendary', 'chimera'],
  },

  type: { type: String },

  sex: {
    type: String,
    enum: ['male', 'female', ''],
    default: '',
  },

  gender: { type: String },

  bio: { type: String },

  created: {
    type: Date,
    default: Date.now,
  },

  designer: { type: String },
  owner: String, // A user ID
  hideOwner: Boolean, // If the user does not want their ownership to be public

  base: { type: String },
  basePrice: { type: Number },

  description: { type: String },

  adminNotes: { type: String },

  link: { type: String }, // An external URL

});

module.exports = mongoose.model('Stardragon', StarDragonSchema);
