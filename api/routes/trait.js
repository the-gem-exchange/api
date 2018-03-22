const router = require('express').Router();
const traitController = require('./../controllers/trait');

// Routes for /traits
router.route('/')
  .get(traitController.list)

module.exports = router;
