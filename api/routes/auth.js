const router         = require('express').Router();
const User           = require('./../models/user');
const authController = require('./../controllers/auth');

/**
 *  @api {post} /auth/login Login
 *  @apiName        Login
 *  @apiDescription Authenticate a user with a username and password.
 *  @apiGroup       Authentication
 *
 *  @apiParam {String} username
 *  @apiParam {String} password
 */
router.route('/login').post(authController.authenticate);

/**
 *  @api {post} /register Register
 *  @apiName        Register
 *  @apiDescription Create a new user.
 *  @apiGroup       Authentication
 */
router.post('/register', (req, res, next) => {

});

/**
 *  @api {get} /getsalt Get Salt
 *  @apiName        Get Salt
 *  @apiDescription Get Salt to be used for password encryption.
 *  @apiGroup       Authentication
 */
router.get('/getsalt', (req, res, next) => {
  authController.getSalt()
    .then((salt) => {
      res.status(200).json({ message: 'Got salt value.', data: salt });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to generate salt.' });
    });
});

module.exports = router;
