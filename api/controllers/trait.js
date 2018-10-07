/**
  Traits Controller
  ---------------------
  Functions for manipulating the Traits collection.
*/

const mongoose = require('mongoose');

const Trait            = mongoose.model('Trait');
const TraitDescription = mongoose.model('TraitDescription');

/**
 *  @function    list
 *  @description List all traits
 */
exports.list = (req, res, next) => {
  let filterBy = {};
  if (req.params.species) {
    filterBy = { species: req.params.species };
  }
  Trait.find(filterBy, (err, traits) => {
    this.sortTraits(traits).then((sortedTraits) => {
      res.send(sortedTraits);
    });
  }).catch(err => next(err));
};

/**
 *  @function    listDescriptions
 *  @description List all trait descriptions
 */
exports.listDescriptions = (req, res, next) => {
  TraitDescription.find({}, (err, traitDescriptions) => {
    res.send(traitDescriptions);
  }).catch(err => next(err));
};

// Sort by rarity: none > common > uncommon > rare > legendary
exports.sortTraits = traits => new Promise((resolve) => {
  const raritySortWeights = {
    none: 0,
    common: 1,
    uncommon: 2,
    rare: 3,
    legendary: 4
  };
  const sortedTraits = traits.sort((a, b) => {
    const weightA = raritySortWeights[a.rarity];
    const weightB = raritySortWeights[b.rarity];
    if (weightA < weightB) { return -1; }
    if (weightA > weightB) { return 1; }
    if (weightA === weightB) { return 0; }
  });
  resolve(sortedTraits);
});

/**
 *  @description Create a new trait
 */
exports.create = (req, res, next) => {
  let newTrait  = new Trait();
  newTrait  = req.body;

  newTrait.save(() => {
    res.json({ message: 'Trait created!' });
  }).catch(err => next(err));
};
