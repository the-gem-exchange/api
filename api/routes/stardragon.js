const router       = require('express').Router();
const Stardragon   = require('../models/stardragon');
const sdController = require('../controllers/stardragon');

// Routes for /stardragons
router.route("/")
  .get(sdController.list)
  .post(sdController.create)

// Routes for /stardragons/:stardragon_id
router.route("/:stardragon_id")
  .post(sdController.details)

module.exports = router;
