const mongoose = require('mongoose');

const { Schema } = mongoose;

const TraitDescriptionSchema = new Schema({

  title: String,
  type:  String,
  description: {
    starfisher:  String,
    starshooter: String,
    stardasher:  String,
    stareater:   String,
    starrobber:  String,
    starsweeper: String,
    starweaver:  String,
    starcrafter: String
  }

}, { collection: 'traitDescriptions' });

module.exports = mongoose.model('TraitDescription', TraitDescriptionSchema);
