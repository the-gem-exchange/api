/**
  Stardragon Controller
  ---------------------
  Functions for manipulating the Stardragon collection.
*/

const mongoose   = require('mongoose');
const orderid    = require('order-id')('mysecret');

const StarDragon = mongoose.model('Stardragon');
const ObjectId   = mongoose.Types.ObjectId;

/**
 *  @function    listconst
 *  @description List all Stardragons
 */
exports.list = (req, res, next) => {
  StarDragon.find({}, (err, stardragons) => {
    if (err) {
      next(err);
    }
    res.json(stardragons);
  });
};

/**
 *  @function    create
 *  @description Create a Stardragon
 */
exports.create = (req, res, next) => {
  if (req.body) {
    const newDragon = new StarDragon(req.body);
    newDragon.save((err, dragon) => {
      if (err) {
        return next(err);
      }
      res.json(dragon);
    });
  }
  return next({ message: 'Missing required fields.', status: 400 });
};

/**
 *  @function    adopt
 *  @description Assign ownership of a Stardragon to a specific user
 */
// exports.adopt = (user, stardragon) => {};

/**
 *  @function    trade
 *  @description Allow users to transfer ownership of a Stardragon
 */
// exports.trade = (user1, trade1, user2, trade2) => {};

/**
 *  @function    details
 *  @description Get a specific Stardragon
 */
exports.details = (req, res, next) => {
  const stardragonId = new ObjectId(req.params.stardragon_id);
  StarDragon.findById(stardragonId, (err, dragon) => {
    if (err) { next(err); }
    res.json(dragon);
  });
};

/**
 *  @function    update
 *  @description Update a stardragon
 */
exports.update = (id, stardragon) => new Promise((resolve, reject) => {
  if (!id) {
    return reject(new Error('No ID provided'));
  }
  StarDragon.findByIdAndUpdate(
    id, stardragon, { new: true },
    (err, updatedDragon) => {
      if (err) {
        return reject(new Error('Error Updating Stardragon'));
      }
      return resolve(updatedDragon);
    }
  );
});
