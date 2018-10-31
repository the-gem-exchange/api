const router         = require('express').Router();
const authController = require('./../controllers/auth');

/**
 *  @api POST /auth/login
 *  @description Authenticate a user with a username and password.
 */
router.post('/login', (req, res, next) => {
  authController.authenticate(req, res, next);
});

/**
 *  @api POST /register
 *  @description Create a new user.
 */
router.post('/register', (req, res, next) => {

});

/**
 *  @api GET /events
 *  @description Get the event log
 */
router.get('/events', (req, res, next) => {
  authController.getEvents()
    .then((events) => {
      res.status(200).json({ message: 'Got events.', data: events });
    })
    .catch((err) => {
      res.status(500).json({ message: `Error getting events. ${err}` });
    });
});

/**
 *  @api GET /getsalt
 *  @description Get Salt to be used for password encryption.
 */
router.get('/getsalt', (req, res, next) => {
  authController.getSalt()
    .then((salt) => {
      res.status(200).json({ message: 'Got salt value.', data: salt });
    })
    .catch((err) => {
      res.status(500).json({ message: `Failed to generate salt. ${err}` });
    });
});

module.exports = router;
