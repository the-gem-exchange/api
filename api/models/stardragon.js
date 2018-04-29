const mongoose   = require('mongoose');

const { Schema } = mongoose;

const StarDragonSchema = new Schema({
  name: {
    type: String,
    required: 'Name required.',
  },

  owner: String, // A user ID

  image: { type: String },
  image_url: { type: String },

  species: {
    type: String,
    enum: [
      'StarEater',
      'StarSweeper',
      'StarDasher',
      'StarFisher',
      'StarWeaver',
      'StarRobber',
      'StarCrafter',
      'StarShooter',
    ],
  },

  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'legendary'],
  },

  type: {
    type: String,
    enum: ['myo', 'batch', 'auction'],
  },

  sex: {
    type: String,
    enum: ['male', 'female', 'n/a'],
    default: 'n/a',
  },

  gender: { type: String },

  created: {
    type: Date,
    default: Date.now,
  },

  approved: { type: Date },

  designer: { type: String },

  base: { type: String },
  basePrice: { type: Number },

  description: { type: String },

  adminNotes: { type: String },

  link: { type: String },

});

module.exports = mongoose.model('Stardragon', StarDragonSchema);
