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
      const sortedTraits = this.sortTraits(traits);
      res.json(sortedTraits);
    });
  }
  Trait.find({}, (err, traits) => {
    if (err) { next(err); }
    const sortedTraits = this.sortTraits(traits);
    res.json(sortedTraits);
  });
};

// Sort by rarity: none > common > uncommon > rare > legendary
exports.sortTraits = (traits) => {
  const raritySortWeights = {
    none: 0,
    common: 1,
    uncommon: 2,
    rare: 3,
    legendary: 4
  };
  return traits.sort((a, b) => {
    const weightA = raritySortWeights[a.rarity];
    const weightB = raritySortWeights[b.rarity];
    if (weightA < weightB) { return -1; }
    if (weightA > weightB) { return 1; }
    if (weightA === weightB) { return 0; }
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
