/**
  Traits Controller
  ---------------------
  Functions for manipulating the Traits collection.
*/

const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const Trait = mongoose.model('Trait');

/**
 *  @function    list
 *  @description List all traits
 */
exports.list = (req, res, next) => {
  if (req.params.species) {
    Trait.find({ species: req.params.species }, (err, traits) => {
      if (err) { next(err); }
      res.json(traits);
    });
  }
  Trait.find({}, (err, traits) => {
    if (err) { next(err); }
    res.json(traits);
  });
};

/**
 *  @description Create a new trait
 */
exports.create = (req, res, next) => {
  let newTrait  = new Trait();
  newTrait  = req.body;

  newTrait.save((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Trait created!' });
  });
};
