const router = require('express').Router();
const traitController = require('./../controllers/trait');

// Routes for /traits
router.route('/')
  .get(traitController.list);

router.route('/:species')
  .get(traitController.list);

module.exports = router;
