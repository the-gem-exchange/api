const mongoose = require('mongoose');

const Schema   = mongoose.Schema;

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

});

module.exports = mongoose.model('TraitDescription', TraitDescriptionSchema);
