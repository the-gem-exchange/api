/**
  Stardragon Controller
  ---------------------
  Functions for manipulating the Stardragon collection.
*/

const mongoose   = require('mongoose');

const StarDragon = mongoose.model('Stardragon');
const { ObjectId } = mongoose.Types;

/**
 *  @function    listconst
 *  @description List all Stardragons
 */
exports.list = (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 0;
  const sort  = { created: -1 };

  StarDragon
    .find({}, (err, stardragons) => {
      if (err) {
        next(err);
      }
      res.json(stardragons);
    })
    .sort(sort)
    .limit(limit);
};

/**
 *  @function    create
 *  @description Create a Stardragon
 */
exports.create = (req, res, next) => {
  const newDragon = new StarDragon(req.body);
  newDragon.save((err, dragon) => {
    if (err) return next(err);
    res.json({ message: `${dragon.name} created successfully.`, status: 200, stardragon: dragon });
  });
};

/**
 *  @function    delete
 *  @description Delete a Stardragon
 */
exports.delete = (req, res, next) => {
  if (req.params.stardragon_id) {
    const stardragonId = new ObjectId(req.params.stardragon_id);
    StarDragon.findByIdAndRemove(stardragonId, (err) => {
      if (err) { next(err); }
      return next({ message: 'Stardragon deleted successfully.', status: 200 });
    });
  } else {
    return next({ message: 'Missing Stardragon ID.', status: 400 });
  }
};

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
