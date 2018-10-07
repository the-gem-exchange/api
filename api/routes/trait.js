const router = require('express').Router();
const traitController = require('./../controllers/trait');

router.route('/')
  /**
   *  @api GET /traits
   *  @description Get all Stardragon traits.
   */
  .get(traitController.list);

router.route('/descriptions')
  /**
   *  @api GET /traits/descriptions
   *  @description Get all trait descriptions.
   *               This provides display names and descriptions for all trait types.
   */
  .get(traitController.listDescriptions);

router.route('/:species')
  /**
   *  @api GET /traits/:species
   *  @description Get traits, filtered by species
   */
  .get(traitController.list);

module.exports = router;
