/**
  Stardragon Controller
  ---------------------
  Functions for manipulating the Stardragon collection.
*/

const mongoose   = require('mongoose'),
      ObjectId   = mongoose.Types.ObjectId,
      StarDragon = mongoose.model('Stardragon'),
      orderid    = require('order-id')('mysecret');

/**
 *  @function    list
 *  @description List all Stardragons
 */
exports.list = function(req, res, next) {
  StarDragon.find({}, function(err, stardragons, next) {
    if (err)
      next(err);
    res.json(stardragons);
  });
}

/**
 *  @function    create
 *  @description Create a Stardragon
 */
exports.create = function(req, res, next) {
  if(req.body){
    var new_dragon = new StarDragon(req.body);
    new_dragon.save(function(err, dragon, next) {
      if (err){
        console.log("ERRORRRRRR", err)
        return next(err);
      }
      res.json(dragon);
    });
  }
  else{
    return next({message:"Missing required fields.", status:400});
  }
}

/**
 *  @function    adopt
 *  @description Assign ownership of a Stardragon to a specific user
 */
exports.adopt = function(user, stardragon) {

}

/**
 *  @function    trade
 *  @description Allow users to transfer ownership of a Stardragon
 */
exports.trade = function(user1, trade1, user2, trade2) {

}

/**
 *  @function    details
 *  @description Get a specific Stardragon
 */
exports.details = function(req, res, next) {
  var stardragon_id = new ObjectId(req.params.stardragon_id)
  StarDragon.findById(stardragon_id, function(err, dragon, next){
    if(err)
      next(err);
    res.json(dragon);
  })
}
