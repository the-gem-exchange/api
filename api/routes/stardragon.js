const router       = require('express').Router();
const Stardragon   = require('../models/stardragon');
const sdController = require('../controllers/stardragon');

// Routes for /stardragons
router.route("/")
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
   *  @apiParam {Date} created Date when this Stardragon was created.
   *  @apiParam {Date} approved Date when this Stardragon was approved. Is often the same value as `created`.
   *  @apiParam {String} gender A user-defined gender, if provided.
   *  @apiParam {String="m","f","n/a"} sex
   *  @apiParam {String="myo","batch","auction"} type
   *  @apiParam {String="common","uncommon","rare","legendary"} rarity
   *  @apiParam {String} species  `starweaver`, `starshooter`, etc.
   *  @apiParam {String} designer The ID or name of the user who created this Stardragon.
   */
  .post(sdController.create)

router.route("/:stardragon_id")
  /**
   *  @api {get} /stardragons/:stardragon_id Get Stardragon
   *  @apiName        GetStardragon
   *  @apiDescription Retrieves a Stardragon from the Stardragon collection.
   *  @apiGroup       Stardragons
   *
   *  @apiParam       {String} stardragon_id The Stardragon's unique ID
   */
  .get(sdController.details)

module.exports = router;
