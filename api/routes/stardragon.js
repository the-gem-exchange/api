const router       = require('express').Router();
const sdController = require('../controllers/stardragon');

// Routes for /stardragons
router.route('/')
  /**
   *  @api GET /stardragons
   *  @description Retrieves a list of Stardragons from the Stardragon collection.
   */
  .get(sdController.list)
  /**
   *  @api GET /stardragons
   *  @description Creates a Stardragon in the Stardragon collection.
   */
  .post(sdController.create);

router.route('/:stardragon_id')
  /**
   *  @api GET /stardragons/:stardragon_id
   *  @description Retrieves a Stardragon from the Stardragon collection.
   */
  .get(sdController.details)
  /**
   *  @api DELETE /stardragons/:stardragon_id
   *  @description Removes a Stardragon from the Stardragon collection.
   */
  .delete(sdController.delete)
  /**
   *  @api PATCH /stardragons/:stardragon_id
   *  @description Apply updates to a Stardragon
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
