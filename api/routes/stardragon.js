const router       = require('express').Router();
const sdController = require('../controllers/stardragon');

// Routes for /stardragons
router.route('/')
  /**
   *  @api {get} /stardragons Get Stardragons
   *  @apiName        GetStardragons
   *  @apiDescription Retrieves a list of Stardragons from the Stardragon collection.
   *  @apiGroup       Stardragons
   */
  .get(sdController.list)
  /**
   *  @api {post} /stardragons Create Stardragon
   *  @apiName        CreateStardragon
   *  @apiDescription Creates a Stardragon in the Stardragon collection.
   *  @apiGroup       Stardragons
   *
   *  @apiParam {String} name The Stardragon's name.
   *  @apiParam {Number} base_price The price this originally sold for.
   *  @apiParam {Date} created Date when created.
   *  @apiParam {Date} approved Date when approved. Often the same val as `created`.
   *  @apiParam {String} gender A user-defined gender, if provided.
   *  @apiParam {String="m","f","n/a"} sex
   *  @apiParam {String="myo","batch","auction"} type
   *  @apiParam {String="common","uncommon","rare","legendary"} rarity
   *  @apiParam {String} species  `starweaver`, `starshooter`, etc.
   *  @apiParam {String} designer The ID or name of the user who created this Stardragon.
   */
  .post(sdController.create);

router.route('/:stardragon_id')
  /**
   *  @api {get} /stardragons/:stardragon_id Get Stardragon
   *  @apiName        GetStardragon
   *  @apiDescription Retrieves a Stardragon from the Stardragon collection.
   *  @apiGroup       Stardragons
   *
   *  @apiParam       {String} stardragon_id The Stardragon's unique ID
   */
  .get(sdController.details)
  /**
   *  @api {patch} /stardragons/:stardragon_id Update Stardragon
   *  @apiName        UpdateStardragon
   *  @apiDescription Apply updates to a Stardragon
   *  @apiGroup       Stardragons
   *
   *  @apiParam {Object} stardragon     An object containing Stardragon attributes
   *  @apiParam {String} stardragon_id  The ID of the Stardragon to be updated *REQUIRED
   */
  .patch((req, res, next) => {
    sdController.update(req.params.stardragon_id, req.body)
      .then((updatedDragon) => {
        res.status(200)
          .json({
            message: 'Stardragon updated successfully.',
            data: updatedDragon,
          })
          .end();
      })
      .catch((updateErr) => {
        res.error = {
          statusCode: 500,
          message: updateErr.message || 'Error updating Stardragon.',
        };
        return next();
      });
  });

module.exports = router;
