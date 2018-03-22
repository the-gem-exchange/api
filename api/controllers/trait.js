const mongoose   = require('mongoose'),
      ObjectId   = mongoose.Types.ObjectId,
      Trait      = mongoose.model('Trait');

/**
 *  @function    list
 *  @description List all traits
 */
exports.list = function(req, res, next) {
  Trait.find({}, function(err, traits, next) {
    if (err)
      next(err);
    res.json(traits);
  });
}

/**
 *  @description Create a new trait
 */
exports.create = function(req, res, next){
    var new_trait  = new Trait();
        new_trait  = req.body;

    new_trait.save(function(err){
      if(err){
        return next(err);
      }
      res.json({message:"Trait created!"})
    });
}
